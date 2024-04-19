import {Link, useNavigate, useParams} from "react-router-dom";
import Download from "./Download";
import Brand from "./Brand";
import {useContext, useEffect} from "react";
import MainContext from "../MainContext";
import {GrLinkPrevious} from "react-icons/gr";
import {AutoSizer, List} from "react-virtualized";

function Collection() {
    const {selectedBrands, setSelectedBrands, brands} = useContext(MainContext)
    const {slugs} = useParams()
    const navigate = useNavigate()

    const clearSelectedBrands = () => {
        setSelectedBrands([])
        navigate('/')
    }

    useEffect(() => {
        setSelectedBrands(slugs.split(','))
    }, []);

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
                <Link to={"/"} onClick={clearSelectedBrands}>
                    <button className="header-back-btn">
                        <GrLinkPrevious/>
                        All brands
                    </button>
                </Link>
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

                {/*{*/}
                {/*    selectedBrands.map(slug => {*/}
                {/*        let brand = brands.find(brand => brand.slug === slug)*/}

                {/*        return (*/}
                {/*            <LazyLoad*/}
                {/*                key={brand.slug}*/}
                {/*                once={true}*/}
                {/*                overflow={true}*/}
                {/*                placeholder={<Loader/>}*/}
                {/*            >*/}
                {/*                <Brand brand={brand}/>*/}
                {/*            </LazyLoad>*/}
                {/*        )*/}
                {/*    })*/}
                {/*}*/}
            </section>
        </main>
    );
}

export default Collection;