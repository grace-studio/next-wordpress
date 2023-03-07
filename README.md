# @grace-studio/next-wordpress

[![npm version](https://badge.fury.io/js/@grace-studio%2Fnext-wordpress.svg)](https://badge.fury.io/js/@grace-studio%2Fnext-wordpress)

Middle layer to connect a Next.js application with WordPress Rest API.

_Note: Requires Next.js 13 or later. Uses next-gen Fetch API in both browser and in Node.js._

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
  // required
  apiUrl: process.env.NEXT_PUBLIC_WORDPRESS_API_URL!,

  // optional auth information for 'apiKey' och 'basic' auth.
  // apiKey
  auth: {
    type: 'apiKey',
    apiKey: 'any api key string',
  },
  // basic
  auth: {
    type: 'basic',
    user: 'username',
    password: 'password',
  },

  // optional header information
  headers: {
    someKey: 'somevalue',
  },
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

// All arrays in the returned data has a generated '_key' field that can be used for the 'key' prop in React loops in rendering.
const partners = await api.get.item<Partner>({
  path: 'partner',
  params: {
    _fields: 'id,link,acf',
  },
});

// Get specific post of type partner with id = 3
const partner = await api.get.singleItem<Partner>({
  path: 'partner',
  id: 3,
  params: {
    _fields: 'id,link,acf',
  },
  verbose: true, // add verbose logging
});
```

More information about what params can be used and how can be found in the [WordPress Rest API documentation](https://developer.wordpress.org/rest-api/using-the-rest-api/).
