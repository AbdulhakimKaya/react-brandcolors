import React, {useContext, useEffect, useState} from 'react';
import MainContext from "../MainContext";
import {GrClose, GrDownload, GrLink} from "react-icons/gr";
import {Link} from "react-router-dom";

function Download() {
    const {selectedBrands, setSelectedBrands, brands} = useContext(MainContext)
    const [downloadUrl, setDownloadUrl] = useState()
    const [cssMethod, setCssMethod] = useState('css')

    useEffect(() => {
        if (selectedBrands.length > 0) {
            let output = ''

            switch (cssMethod) {
                case 'css':
                    output += ':root {\n'
                    selectedBrands.map(slug => {
                        let brand = brands.find(brand => brand.slug === slug)
                        return (
                            brand.colors.map((color, key) => (
                                output += `--${slug}-${key}: #${color};\n`
                            ))
                        )
                    })
                    output += '}'
                    break

                case 'scss':
                    selectedBrands.map(slug => {
                        let brand = brands.find(brand => brand.slug === slug)
                        return (
                            brand.colors.map((color, key) => (
                                output += `\$${slug}-${key}: #${color};\n`
                            ))
                        )
                    })
                    break

                case 'less':
                    selectedBrands.map(slug => {
                        let brand = brands.find(brand => brand.slug === slug)
                        return (
                            brand.colors.map((color, key) => (
                                output += `@${slug}-${key}: #${color};\n`
                            ))
                        )
                    })
                    break

                default:
                    break
            }

            const blob = new Blob([output])
            const url = URL.createObjectURL(blob)
            setDownloadUrl(url)
            return () => {
                URL.revokeObjectURL(url)
                setDownloadUrl('')
            }
        }
    }, [selectedBrands, cssMethod]);

    // const getLink = () => {
    //     prompt('Here\s the URL to share', `http://localhost:3000/collection/${selectedBrands.join(',')}`)
    // }

    return (
        <div className="download">
            <div className="download-actions">
                <select onChange={(e) => setCssMethod(e.target.value)}>
                    <option value="css">CSS</option>
                    <option value="scss">SCSS</option>
                    <option value="less">LESS</option>
                </select>
                <a href={downloadUrl} download={`brands.${cssMethod}`}>
                    <GrDownload/>
                </a>
                <Link to={`/collection/${selectedBrands.join(',')}`}>
                    <GrLink/>
                </Link>
            </div>
            <div
                className="download-selected"
                onClick={() => setSelectedBrands([])}
            >
                <button>
                    <GrClose/>
                </button>
                {selectedBrands.length} brands collected
            </div>
        </div>
    );
}

export default Download;