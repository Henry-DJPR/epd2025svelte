# Employment Projections Data Download Service

A SvelteKit-based web service for downloading employment forecast data from the 2025 Employment Projections Dashboard.

## Overview

This service provides programmatic access to employment projection data through URL-based parameters, allowing users to download filtered datasets in Excel format. The service supports filtering by occupation (ANZSCO codes), industry (ANZSIC codes), and geographical regions.

## Features

- **Multi-dimensional filtering**: Filter data by occupation, industry, and region
- **Excel export**: Automatically generates and downloads Excel files
- **URL-based interface**: Simple URL parameter system for data requests
- **Accessibility compliant**: Implements WCAG guidelines with proper ARIA labels
- **Optimized performance**: Minimal Bootstrap imports for faster loading

## URL Format

### Basic Structure
```
/download/{parameter}={value1+value2}/{parameter2}={value3}
```

### Supported Parameters

- **occupation**: 4-digit ANZSCO codes (e.g., 1111, 2222, 3333)
- **industry**: 1-digit ANZSIC codes (e.g., 1, 2, 3)
- **region**: Region identifiers (e.g., metro, barwon, gippsland)

### Examples

**Single occupation download:**
```
/download/occupation=1111
```

**Multiple occupations:**
```
/download/occupation=1111+2222+3333
```

**Multi-dimensional filtering:**
```
/download/occupation=1111/industry=1
/download/occupation=1111/region=metro
/download/industry=1+2/region=metro+barwon
```

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── DownloadStatus.svelte    # Download progress indicator
│   │   └── FilterSummary.svelte     # Filter selection display
│   ├── config/
│   │   └── downloads.js             # Download configuration
│   ├── filters/
│   │   └── occupation.js            # Data filtering logic
│   ├── services/
│   │   ├── dataLoader.js            # Data loading service
│   │   └── excelGenerator.js        # Excel file generation
│   ├── utils/                       # Utility functions
│   ├── taxonomies/                  # ANZSCO/ANZSIC classifications
│   └── scss/
│       └── styles.scss              # Optimized Bootstrap imports
└── routes/
    ├── +layout.svelte               # Main layout with navigation
    ├── +page.svelte                 # Home page with usage instructions
    └── download/
        └── [...params]/
            └── +page.svelte         # Dynamic download handler
```

## Development

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Setup
```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build
```

### Testing
```bash
# Run linting
pnpm lint

# Run type checking
pnpm typecheck
```

## Bootstrap Optimization

The project uses a minimal Bootstrap configuration importing only the required components:
- Grid system (containers, grid)
- Typography utilities
- Alert components
- Spinner components
- Utility classes

This reduces bundle size compared to importing the full Bootstrap library.

## Accessibility Features

The application implements WCAG 2.1 accessibility guidelines including:
- Semantic HTML structure with proper roles
- ARIA labels and descriptions
- Keyboard navigation support
- Screen reader compatible status updates
- Proper heading hierarchy
- Color contrast compliance

## Data Flow

1. User accesses URL with parameters
2. Parameters are parsed and validated
3. Data is loaded from the configured source
4. Filters are applied based on parameters
5. Excel file is generated with filtered data
6. File is automatically downloaded to user's device

## Configuration

The service is configured through:
- `src/lib/config/downloads.js`: Download configurations and templates
- `src/lib/taxonomies/`: Classification systems (ANZSCO, ANZSIC)
- Environment variables for data sources and API endpoints

## Deployment

The application is designed to be deployed as a static site and can be hosted on:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

Build the application with `pnpm build` and deploy the `build/` directory.

## License

© Government of Victoria, 2025
