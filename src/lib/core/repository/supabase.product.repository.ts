import {
  createClient,
} from "@/lib/supabase/server";


import type {
  SupabaseProductRepositoryContract,
} from "./supabase.product.contract";


import type {
  SupabaseProductCreateInput,
  SupabaseProductUpdateInput,
  SupabaseProductQuery,
} from "./supabase.product.types";


import {
  SupabaseProductMapper,
} from "./supabase.product.mapper";


import {
  ProductCreateError,
  ProductReadError,
  ProductUpdateError,
  ProductDeleteError,
} from "./supabase.product.errors";


import type {
  UniversalEntity,
  UniversalStoreResult,
} from "../store/universal.types";


import type {
  NormalizedProduct,
} from "@/core/normalization/normalizer.types";



export class SupabaseProductRepository
implements SupabaseProductRepositoryContract {



  private async client() {
    return createClient();
  }



  async create(
    input: SupabaseProductCreateInput
  ):
  Promise<
    UniversalStoreResult<
      UniversalEntity<NormalizedProduct>
    >
  >
  {

    try {

      const supabase =
        await this.client();


      const {
        data,
        error
      } =
      await supabase
        .from("products")
        .insert(
          SupabaseProductMapper.toDatabase(input)
        )
        .select()
        .single();



      if(error || !data)
        throw new ProductCreateError(error?.message);



      return {
        success:true,
        data:
          SupabaseProductMapper.toEntity(data)
      };


    } catch(error){

      throw new ProductCreateError(
        error instanceof Error
        ? error.message
        : undefined
      );

    }

  }




  async findById(
    id:string,
    organizationId:string
  )
  {

    const supabase =
      await this.client();


    const {
      data,
      error
    }
    =
    await supabase
      .from("products")
      .select("*")
      .eq("id",id)
      .eq(
        "organization_id",
        organizationId
      )
      .single();



    if(error || !data)
      throw new ProductReadError(error?.message);



    return {

      success:true,

      data:
        SupabaseProductMapper.toEntity(data)

    };

  }




  async find(
    query?:SupabaseProductQuery
  )
  {

    const supabase =
      await this.client();


    let request =
      supabase
      .from("products")
      .select("*");



    if(query?.organization_id)
      request =
        request.eq(
          "organization_id",
          query.organization_id
        );



    const {
      data,
      error
    }
    =
    await request;



    if(error)
      throw new ProductReadError(error.message);



    return {

      success:true,

      data:
        (data ?? [])
        .map(
          SupabaseProductMapper.toEntity
        )

    };

  }





  async update(
    id:string,
    organizationId:string,
    input:SupabaseProductUpdateInput
  )
  {


    const supabase =
      await this.client();


    const {
      data,
      error
    }
    =
    await supabase
      .from("products")
      .update(
        SupabaseProductMapper.toUpdate(input)
      )
      .eq("id",id)
      .eq(
        "organization_id",
        organizationId
      )
      .select()
      .single();



    if(error || !data)
      throw new ProductUpdateError(error?.message);



    return {

      success:true,

      data:
        SupabaseProductMapper.toEntity(data)

    };


  }




  async upsert(
    input:SupabaseProductCreateInput
  )
  {

    const supabase =
      await this.client();


    const {
      data,
      error
    }
    =
    await supabase
      .from("products")
      .upsert(
        SupabaseProductMapper.toDatabase(input)
      )
      .select()
      .single();



    if(error || !data)
      throw new ProductCreateError(error?.message);



    return {

      success:true,

      data:
        SupabaseProductMapper.toEntity(data)

    };

  }





  async delete(
    id:string,
    organizationId:string
  )
  {

    const supabase =
      await this.client();



    const {
      error
    }
    =
    await supabase
      .from("products")
      .delete()
      .eq("id",id)
      .eq(
        "organization_id",
        organizationId
      );



    if(error)
      throw new ProductDeleteError(
        error.message
      );



    return {

      success:true,

      data:true

    };

  }





  async exists(
    id:string,
    organizationId:string
  )
  {

    const result =
      await this.findById(
        id,
        organizationId
      );


    return result.success;

  }




  async findBySku(
    sku:string,
    organizationId:string
  )
  {

    const supabase =
      await this.client();



    const {
      data,
      error
    }
    =
    await supabase
      .from("products")
      .select("*")
      .eq(
        "organization_id",
        organizationId
      )
      .eq(
        "metadata->>sku",
        sku
      )
      .single();



    if(error || !data)
      throw new ProductReadError(error?.message);



    return {

      success:true,

      data:
        SupabaseProductMapper.toEntity(data)

    };

  }





  async findByExternalId(
    externalId:string,
    organizationId:string
  )
  {

    const supabase =
      await this.client();



    const {
      data,
      error
    }
    =
    await supabase
      .from("products")
      .select("*")
      .eq(
        "organization_id",
        organizationId
      )
      .eq(
        "metadata->>externalId",
        externalId
      )
      .single();



    if(error || !data)
      throw new ProductReadError(error?.message);



    return {

      success:true,

      data:
        SupabaseProductMapper.toEntity(data)

    };

  }


}



export const supabaseProductRepository =
new SupabaseProductRepository();
