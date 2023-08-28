"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import SearchManufacturer from "./SearchManufacturer";



const SearchBar = ( {otherclasses}: { otherclasses:string} ) => {
  const [manufacturer, setManuFacturer] = useState("");
  const [model, setModel] = useState("");
  const router = useRouter();
  const handlesearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(manufacturer === `` && model === '') {
      return alert(" please fill in the search bar")
    }
    updateSearchParams(
      model.toLowerCase(),
      manufacturer?.toLowerCase()
    )
  };

  const updateSearchParams = (model: string, manufacturer:string) => {

    const searchParams = new URLSearchParams(window.location.search);

    if (model){ 
      searchParams.set('manufacturer', manufacturer)
    } else {
      searchParams.delete('manufacturer')
    }

    const newPathname = ` ${window.location.pathname}?${searchParams.toString()}`

    router.push(newPathname)
  }

  const SearchButton = ({ otherClasses }: { otherClasses: string }) => (
    <button type='submit' className={`-ml-3 z-10 ${otherClasses}`}>
      <Image
        src={"/magnifying-glass.svg"}
        alt={"magnifying glass"}
        width={40}
        height={40}
        className='object-contain'
      />
    </button>
  );
  


  return (
    <form className="searchbar" onSubmit={handlesearch}>
      <div className="searchbar__item">
        <SearchManufacturer 
          manufacturer={manufacturer}
          setManuFacturer={setManuFacturer} />

       
      </div>

      <div className="searchbar__item">
        <Image 
        src="/model-icon.png"
        width={25}
        height={25}
        className="absolute"
        alt=""
         />
         <input 
         type="text"
        name="model"
        value={model}
        onChange={(e) => setModel(e.target.value)}
        placeholder="tiguan"
        className="searchbar__input"
    />
     <SearchButton otherClasses="sm:hidden" />
      </div>
      <SearchButton otherClasses="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
