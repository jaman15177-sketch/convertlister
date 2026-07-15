/**
 * ==========================================================
 * ALIEXPRESS ADAPTER
 * ==========================================================
 *
 * Marketplace adapter implementation.
 *
 * Responsibilities
 * ----------------------------------------------------------
 * • Connect AliExpress services
 * • Execute search/import flow
 * • Return AdapterProduct format
 *
 * Must NOT
 * ----------------------------------------------------------
 * ✗ Normalize product
 * ✗ Create canonical identity
 * ✗ Save Universal Store
 * ✗ Make winning decision
 * ==========================================================
 */


import type {
  AdapterContract,
  AdapterQuery,
  AdapterResult,
  AdapterProduct,
} from "@/adapters/core/adapter.contract";


import {
  aliExpressSearch,
} from "./aliexpress.search";


import {
  aliExpressMapper,
} from "./aliexpress.mapper";


import {
  aliExpressValidator,
} from "./aliexpress.validator";



export class AliExpressAdapter
  implements AdapterContract<
    AdapterQuery,
    AdapterProduct[]
  > {


  name =
    "aliexpress";



  /**
   * Prepare marketplace query
   */
  transform(
    input: AdapterQuery
  ): AdapterQuery {


    return {

      ...input,

      keyword:
        input.keyword.trim(),

      page:
        input.page ?? 1,

    };

  }



  /**
   * Execute import search
   */
  async execute(
    input: AdapterQuery
  ): Promise<
    AdapterResult<AdapterProduct[]>
  > {


    const products =
      await aliExpressSearch.search(
        {
          keyword:
            input.keyword,

          page:
            input.page,

        }
      );



    aliExpressValidator.validateMany(
      products
    );



    const mapped =
      aliExpressMapper.mapMany(
        products
      );



    return {

      success:
        true,

      data:
        mapped,

      source:
        this.name,

      timestamp:
        Date.now(),

    };

  }


}



export const aliExpressAdapter =
  new AliExpressAdapter();
