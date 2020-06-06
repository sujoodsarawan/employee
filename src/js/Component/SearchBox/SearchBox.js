import React  from "react";

const SearchBox =({handelChange ,handelSubmit , ...Otherprops})=>(
        <div className="wrap">
        <div className="search">
        <form onSubmit={handelSubmit}>  
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            onChange={handelChange}
            {...Otherprops}
          />

</form>
        </div>
      </div>

)

export default SearchBox;
