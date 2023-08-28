
import { HomeProps } from "../types/index";
import { fuels, yearsOfProduction } from "../constants/index";
import {  SearchBar, Hero, ShowMore } from "../components";
import { fetchCars  } from "@/utils/insex";
import {CustomFilter} from "@/components/CustomFilter";
import  CarCard   from "@/components/CarCard"
export default async function Home({ searchParams }: HomeProps) {
  const allcars = await fetchCars({
    manufacturer: searchParams.manufacturer || "",
    year: searchParams.year || 2022,
    fuel: searchParams.fuel || "",
    limit: searchParams.limit || 10,
    model: searchParams.model || "",
  });
 console.log(allcars);

  const isDataEmpty = !Array.isArray(allcars) || allcars.length <1 || !allcars;
  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar otherclasses="sm" />

        {/*   <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} />
            <CustomFilter title='year' options={yearsOfProduction} />
          </div> */}
        </div>

        {!isDataEmpty ? (
<section>
  <div className="home__cars-wrapper">
          {allcars?.map((car)=> (
            // eslint-disable-next-line react/jsx-key
            <CarCard car={car}/>
          ))}
    </div>
    <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allcars.length}
            />
</section>
        ):(
          <div className="home__error-container">

            <h2 className="text-black text-xl"> oops</h2>
            </div>
        )
        }
      </div>
    </main>
  );
}