<script>
	// Imports & high level definitions
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { error } from '@sveltejs/kit';
	import { extractUnit } from '$lib/utils';
	import * as XLSX from 'xlsx-js-style';
	import anzsco2021 from '$lib/taxonomies/anzsco2021_nested.json';
	import wbData from '$lib/workbooks/occupation_2027.json';
	const anzsco = page.params.anzsco.split('+').map(Number);

	// All submajors & codes
	const anzsco4 = extractUnit(anzsco2021);
	let anzsco4Codes = [];
	anzsco4.forEach((unit) => {
		anzsco4Codes.push(unit.code);
	});

	// Error handling for invalid ANZSCO codes
	if (!anzsco.every((code) => anzsco4Codes.includes(code))) {
		error(404, 'Occupation not found');
	}

	// Workbook download
	function downloadExcel() {
		// Filter wbData for matching ANZSCO4 codes
		const filteredData = wbData.filter((row) =>
			anzsco.includes(Number(row['Occupation ANZSCO4 Code']))
		);

		// Convert filtered JSON to worksheet
		const ws = XLSX.utils.json_to_sheet(filteredData);

		// Get header keys
		const headers = Object.keys(filteredData[0] || {});
		const range = XLSX.utils.decode_range(ws['!ref']);

		// Style header row (outer border only)
		headers.forEach((header, colIdx) => {
			const cellAddress = XLSX.utils.encode_cell({ r: 0, c: colIdx });
			if (!ws[cellAddress]) return;
			const border = {};
			if (colIdx === 0) border.left = { style: 'thin', color: { rgb: '000000' } };
			if (colIdx === headers.length - 1) border.right = { style: 'thin', color: { rgb: '000000' } };
			border.top = { style: 'thin', color: { rgb: '000000' } };
			ws[cellAddress].s = {
				font: { bold: true, color: { rgb: 'FFFFFF' } },
				fill: { fgColor: { rgb: '000000' } },
				alignment: { horizontal: 'center', vertical: 'center' },
				border
			};
		});

		// Style data cells and format numbers
		for (let r = 1; r <= range.e.r; r++) {
			for (let c = 0; c <= range.e.c; c++) {
				const cellAddress = XLSX.utils.encode_cell({ r, c });
				const cell = ws[cellAddress];
				if (!cell) continue;
				const border = {};
				if (r === range.e.r) border.bottom = { style: 'thin', color: { rgb: '000000' } };
				if (r === 1) border.top = { style: 'thin', color: { rgb: '000000' } };
				if (c === 0) border.left = { style: 'thin', color: { rgb: '000000' } };
				if (c === range.e.c) border.right = { style: 'thin', color: { rgb: '000000' } };
				cell.s = { border };

				const header = headers[c];
				// Format numbers with commas, except for the code column
				if (typeof cell.v === 'number' && header !== 'Occupation ANZSCO4 Code') {
					// Format "Annual employment growth rate (%) 2024-2027" to two decimals
					if (header === 'Annual employment growth rate (%) 2024-2027') {
						cell.z = '0.00';
						cell.v = Number(cell.v).toFixed(2); // Ensures two decimals
						cell.v = Number(cell.v); // Keep as number
					} else {
						cell.z = '#,##0';
					}
				}
			}
		}

		// Auto-fit column widths
		ws['!cols'] = headers.map((header, colIdx) => {
			let maxLen = header.length;
			for (let r = 1; r <= range.e.r; r++) {
				const cellAddress = XLSX.utils.encode_cell({ r, c: colIdx });
				const cell = ws[cellAddress];
				if (cell && cell.v != null) {
					const cellStr = String(cell.v);
					if (cellStr.length > maxLen) maxLen = cellStr.length;
				}
			}
			return { wch: maxLen + 2 };
		});

		// Turn off gridline view
		ws['!views'] = [{ showGridLines: false }];

		// Create a new workbook and append the worksheet
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, 'Occupation Data');

		// Write workbook to binary array
		const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

		// Create a Blob and trigger download
		const blob = new Blob([wbout], { type: 'application/octet-stream' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = 'occupation_data.xlsx';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}

	// Download on mount
	onMount(() => {
		downloadExcel();
	});
</script>

<svelte:head>
	<title>Occupation data download</title>
	<meta name="description" content="Downloading employment projection occupation data" />
</svelte:head>

<div class="container-fuild position-absolute top-50 start-50 translate-middle">
	<div class="row text-center">
		<h1 class="display-2">Occupation data download</h1>
		{#if anzsco.length === 1}
			<p class="lead text-muted">
				You have selected the occupation: <strong
					>{anzsco4.find((sub) => sub.code === anzsco[0]).name}</strong
				>.
			</p>
		{:else if anzsco.length > 8}
			<p class="lead text-muted">You have selected {anzsco.length} occupations.</p>
		{:else if anzsco.length > 1}
			<p class="lead text-muted">You have selected the following occupations:</p>
			<div class="row justify-content-center">
				<ul class="text-start" style="max-width: max-content;">
					{#each anzsco as code}
						<li>
							<strong>{anzsco4.find((sub) => sub.code === code).name}</strong>
						</li>
					{/each}
				</ul>
			</div>
		{:else}
			<p class="lead text-muted">No occupation selected.</p>
		{/if}
		<p class="text-muted fst-italic">
			If the download has not stated automatically, <a href="/">please click here</a>.
		</p>
	</div>
</div>
