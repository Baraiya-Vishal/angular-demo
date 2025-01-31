export interface FilterConfig {
    field: string;      // The field name to filter on (e.g., 'name', 'status')
    type: string;       // The type of filter (e.g., 'text', 'number', 'select')
    label: string;      // The label to display for this filter
    options?: string[]; // Options for 'select' filters (optional)
    triggerOnChange?: boolean; // If true, applies the filter immediately when changed
  }