import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

/**
 * Factory function to create a TranslateHttpLoader instance.
 * This loader is responsible for loading translation files from the specified path.
 *
 * @param {HttpClient} http - The HttpClient instance used to make HTTP requests.
 * @returns {TranslateHttpLoader} - A new instance of TranslateHttpLoader configured with the translation file path and extension.
 */
const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (
  http: HttpClient
) => new TranslateHttpLoader(http, './assets/i18n/', '.json');

/**
 * Application configuration object for Angular bootstrapping.
 * This configuration sets up providers for routing, translation, HTTP client, and hydration.
 *
 * @type {ApplicationConfig}
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Provides zone change detection with event coalescing enabled.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    /**
     * Provides the router configuration based on the defined routes.
     */
    provideRouter(routes),
    
    /**
     * Enables client-side hydration for server-side rendering scenarios.
     */
    provideClientHydration(),
    
    /**
     * Configures the HTTP client with fetch support.
     */
    provideHttpClient(withFetch()),
    
    /**
     * Imports and configures the TranslateModule to handle internationalization.
     * The loader is created using the httpLoaderFactory function.
     */
    importProvidersFrom([TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    })])
  ],
};
