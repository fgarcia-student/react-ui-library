import * as React from 'react';

export interface SearchSelectRequestSettings {
  url: string;
  method: string;
  body?: { [key: string]: string };
  headers?: { [key: string]: string };
}

export interface SearchSelectRequestBuilderParams {
  /**
   * Value provided to request builder if in simple mode
   */
  searchValue?: string;
  /**
   * Value provided to request builder if in complex mode
   */
  searchValues?: { [key: string]: string };
}

export interface SearchSelectDefaultFormatterOptions {
  main: string;
  sub?: string;
  right?: string;
  image?: string;
}

export interface SearchSelectValueOptions {
  /**
   * Used as the select value, if not unique will result in strange behavior
   */
  primaryKey: string | number;
  /**
   * Determines the source of the data
   *
   * "local" requires the user to provide the data property with all data to be used in the SearchSelect
   * "remote" requires the user to provide a requestBuilder
   */
  source: 'local' | 'remote';
  /**
   * Requires source: "local"
   */
  data?: any[];
  /**
   * Requires source: "remote"
   * Determines the url, method, body, and headers of the request to be sent out given the search terms
   */
  requestBuilder?: (
    searchValues: SearchSelectRequestBuilderParams
  ) => SearchSelectRequestSettings;
  /**
   * Requires source: "remote",
   * Passes values retrieved from remote source through this transformer,
   * allowing the user to massage the response if needed
   */
  valueTransformer?: (value?: any) => any;
}

export interface SearchSelectProps {
  /**
   * Requires searchMode={"simple"}
   *
   * Defines the key used to search on
   *
   * @default id
   */
  searchKey?: string;
  /**
   * Requires searchMode={"complex"}
   *
   * Defines the template used to fill in multiple search criteria
   */
  searchTemplate?: (value: any) => JSX.Element;
  /**
   * Defines the value that is selected on initialization
   *
   * @default null
   */
  initialSelectedValue?: string | number | null;
  /**
   * Defines the modes of the SearchSelect
   *
   * Simple - search all provided values on a single search key
   * Complex - uses a user provided template to search on multiple values
   */
  searchMode: 'simple' | 'complex';
  /**
   * Defines if the SearchSelect is disabled
   *
   * @default false
   */
  disabled?: boolean;
  /**
   * Defines the action taken when a value is selected
   */
  onSelect?: (value: string | number | null) => void;
  /**
   * Defines if pressing the ENTER key while at least one option is showing
   * during a search selects the first search result.
   *
   * This triggers the provided onSelect function and skips the blank value, if enableBlank is provided.
   *
   * @default false
   */
  defaultOnEnter?: boolean;
  /**
   * Defines if a blank option is present to select. This acts as a null value
   *
   * When selected, this option triggers the provided onSelect function.
   * This option will NOT be default selected if defaultOnEnter is provided
   *
   * @default false
   */
  enableBlank?: boolean;
  /**
   * If provided, will be called on each value to produce the final option card
   */
  valueFormatter?: (value: any) => JSX.Element;
  /**
   * If no valueFormatter is provided, a default card will be used
   * The keys provided will fill in the fields for each object
   */
  defaultFormatter?: SearchSelectDefaultFormatterOptions;
  /**
   * Defines properties that pertain to values
   */
  values: SearchSelectValueOptions;
}

export const SearchSelect: React.FC = () => <></>;
