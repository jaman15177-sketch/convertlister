/**
 * ==========================================================
 * ALIEXPRESS AUTH
 * ==========================================================
 *
 * Authentication layer for AliExpress Adapter.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Manage API credentials
 * • Provide authentication headers
 * • Validate credential availability
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Make API calls
 * ✗ Store secrets permanently
 * ✗ Handle product data
 * ==========================================================
 */


import {
  AliExpressAuthError,
} from "./aliexpress.errors";



export interface AliExpressAuthConfig {

  appKey?: string;

  appSecret?: string;

  accessToken?: string;

}



export class AliExpressAuth {


  private config:
    AliExpressAuthConfig;



  constructor(
    config?: AliExpressAuthConfig
  ) {

    this.config =
      config ??
      {

        appKey:
          process.env.ALIEXPRESS_APP_KEY,

        appSecret:
          process.env.ALIEXPRESS_APP_SECRET,

        accessToken:
          process.env.ALIEXPRESS_ACCESS_TOKEN,

      };

  }



  /**
   * Validate credentials
   */
  public validate(): void {


    if (
      !this.config.appKey &&
      !this.config.accessToken
    ) {

      throw new AliExpressAuthError(
        "AliExpress credentials are missing."
      );

    }

  }



  /**
   * Get authentication headers
   */
  public getHeaders():
    Record<string, string> {


    this.validate();


    const headers:
      Record<string, string> =
      {};


    if (
      this.config.accessToken
    ) {

      headers.Authorization =
        `Bearer ${this.config.accessToken}`;

    }


    if (
      this.config.appKey
    ) {

      headers[
        "X-App-Key"
      ] =
        this.config.appKey;

    }


    return headers;

  }


}


export const aliExpressAuth =
  new AliExpressAuth();
