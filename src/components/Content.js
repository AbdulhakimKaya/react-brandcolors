import Search from "./Search";
import Brand from "./Brand";
import {useContext} from "react";
import MainContext from "../MainContext";
import Download from "./Download";
import {AutoSizer, List} from "react-virtualized";

function Content() {
    const {brands, selectedBrands} = useContext(MainContext)

    const rowRenderer = ({key, index, style, isScrolling}) => {
        // const content = isScrolling ? <Loader/> : <Brand brand={brands[index]}/>
        const content = <Brand brand={brands[index]}/>
        return (
            <div style={style} key={key}>
                {content}
            </div>
        )
    }

    return (
        <main className="content">
            <header className="header">
                <Search/>
                {selectedBrands.length !== 0 && <Download/>}
            </header>
            <section className="brands">
                <AutoSizer
                >
                    {({width, height}) => (
                        <List
                            width={width}
                            height={height}
                            rowCount={brands.length}
                            rowHeight={130}
                            rowRenderer={rowRenderer}
                        />
                    )}
                </AutoSizer>
            </section>
        </main>
    )
}

export default Content