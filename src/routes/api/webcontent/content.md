# Content & Code Organization

Content is organized as links and pages. Each URL is represented as a Link and optionally as a Page. Only Urls that are of type "text/html" are the ones that will be fetched as pages.

Code is organized in a manner that directories represent the API routes and +server.ts files only contain the logic specific to handling of HTTP requests.

All businesss logic is handled by services and other non-sveltekit dependent objects. This will help us migrate to another framework, if there is ever a need.
