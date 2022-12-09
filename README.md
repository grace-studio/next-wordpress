# @grace-studio/next-wordpress

[![npm version](https://badge.fury.io/js/@grace-studio%2Fnext-wordpress.svg)](https://badge.fury.io/js/@grace-studio%2Fnext-wordpress)

Middle layer to connect a Next.js application with WordPress Rest API.

*Note: Requires Next.js 13 or later. Uses next-gen Fetch API in both browser and in Node.js.*

## Installation

```bash
npm i @grace-studio/next-wordpress
```

or

```bash
yarn add @grace-studio/next-wordpress
```

## Usage example

```ts
import {
  NextWordPress,
  NextWordPressConfig,
} from '@grace-studio/next-wordpress';

const config: NextWordPressConfig = {
  apiUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL!,
};

// Create instance of NextWordPress
export const api = NextWordPress.create(config);

// Get posts from custom post type 'partner'
// And specify which fields to be populated by the API.
type Partner = {
  id: number;
  link: string;
  acf: Record<string, any>;
};

// All arrays in the returned data has a generated '_key' field that can be used for the 'key' value in React loops in rendering.
const partners = await api.get.item<Partner>({
  path: 'partner',
  params: {
    _fields: 'id,link,acf',
  },
});
```

More information about what params can be used and how can be found in the [WordPress Rest API documentation](https://developer.wordpress.org/rest-api/using-the-rest-api/).
