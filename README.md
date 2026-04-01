# advert-forecasting-my-code

This is anonymized professional work form a TypeScript AWS lambda

I had to remove the template boilerplate code as it required custom packages but I kept the code I wrote which would be enough to review.

Lambda is a cron job which would run twice daily to manage advert forecasting reports.
First cron job generates the reports and saves the id to a google sheet.
Second cron job reads the google sheet for the report id, fetches report then formats to then write to a different google sheet.

## Structure

`config\routesAndEvents.ts\routesAndEvents.ts` => is the entrypoint and points to the handlers for the Cron jobs

`app\handlers\cron\forecasting` => contains the handlers with tests that call the services which hold the bulk of the logic

`app\services` => folder for all the services

## Testing

`npm test` works for testing minus 3 which don't work because of the missing custom packages
