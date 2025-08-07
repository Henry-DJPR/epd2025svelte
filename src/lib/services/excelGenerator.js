import * as XLSX from 'xlsx-js-style';

export class ExcelGenerator {
	constructor(data, config) {
		this.data = data;
		this.config = config;
	}

	generate() {
		if (!this.data || this.data.length === 0) {
			throw new Error('No data to generate Excel file');
		}

		// Convert filtered JSON to worksheet
		const ws = XLSX.utils.json_to_sheet(this.data);

		// Apply styling
		this.applyHeaderStyling(ws);
		this.applyDataStyling(ws);
		this.applyColumnFormatting(ws);
		this.autoFitColumns(ws);

		// Configure worksheet
		ws['!views'] = [{ showGridLines: false }];

		// Create workbook
		const wb = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(wb, ws, this.config.sheetName);

		return wb;
	}

	applyHeaderStyling(ws) {
		if (!this.data.length) return;

		const headers = Object.keys(this.data[0]);
		const range = XLSX.utils.decode_range(ws['!ref']);

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
	}

	applyDataStyling(ws) {
		if (!this.data.length) return;

		const headers = Object.keys(this.data[0]);
		const range = XLSX.utils.decode_range(ws['!ref']);

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
			}
		}
	}

	applyColumnFormatting(ws) {
		if (!this.data.length) return;

		const headers = Object.keys(this.data[0]);
		const range = XLSX.utils.decode_range(ws['!ref']);

		for (let r = 1; r <= range.e.r; r++) {
			for (let c = 0; c <= range.e.c; c++) {
				const cellAddress = XLSX.utils.encode_cell({ r, c });
				const cell = ws[cellAddress];
				if (!cell) continue;

				const header = headers[c];

				// Format numbers with commas, except for code columns
				if (typeof cell.v === 'number' && !header.toLowerCase().includes('code')) {
					// Format percentage fields to two decimals
					if (header.toLowerCase().includes('rate') && header.includes('%')) {
						cell.z = '0.00';
						cell.v = Number(cell.v).toFixed(2);
						cell.v = Number(cell.v);
					} else {
						cell.z = '#,##0';
					}
				}
			}
		}
	}

	autoFitColumns(ws) {
		if (!this.data.length) return;

		const headers = Object.keys(this.data[0]);
		const range = XLSX.utils.decode_range(ws['!ref']);

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
			return { wch: Math.min(maxLen + 2, 50) }; // Cap at 50 characters
		});
	}

	download() {
		const wb = this.generate();
		
		// Write workbook to binary array
		const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

		// Create a Blob and trigger download
		const blob = new Blob([wbout], { type: 'application/octet-stream' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = this.config.filename;
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}
}