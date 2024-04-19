import {GrSearch} from "react-icons/gr";
import {useContext} from "react";
import MainContext from "../MainContext";

function Search() {
    const {setSearch} = useContext(MainContext)

    return (
        <div className="search">
            <div className="search-icon">
                <GrSearch />
            </div>
            <input
                type="text"
                placeholder="Search Brands"
                onChange={
                    (e) => setSearch(e.target.value)
                }
            />
        </div>
    )
}

export default Search