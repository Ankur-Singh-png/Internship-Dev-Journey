import React from "react"
import { useState, useContext } from "react"
import searchBarData from "./userContext";
import { sharepointAjax } from "../../utility/utility";

/**
 * Documents Component contains all the elements of Documents portion in Video Tour Section
 */

function Documents() {
    const { search } = useContext(searchBarData);
    const [data, setData] = useState([]);

    /**
     * getTableData is being used for API calls and passing values in Documents Section of the component
     * @returns Function returns File Name, Modified By, Url of the Document
     */

    const getTableData = async () => {
        const tableList = (await sharepointAjax(".//api")).d.results;                                // API Calls over here
        const newDataArray = await Promise.all(
            tableList.map(async (item) => {
                const author = await sharepointAjax(item.Author["__deferred"].uri);
                const lastDotIndex = item.Name.lastIndexOf(".");
                const fileNameWithoutExtension = item.Name.slice(0, lastDotIndex);

                return {
                    name: fileNameWithoutExtension,
                    created: author.d.Title,
                    url: item.LinkingUri,
                };
            })
        );

        setData((prevData) => [...prevData, ...newDataArray]);
    }
    React.useEffect(() => {
        getTableData();
    }, []);

    return (
        <>
            <div className="table-container">
                <table className="doc-table">
                    <tr className="table-headers">
                        <td className="table-data">Name</td>
                        <td>Modified By</td>
                    </tr>
                    <tbody className="table-body">
                        {data.length === 0 ?
                            <tr>
                                <td colSpan={2} className="no-data">NO DATA FOUND!</td>
                            </tr> :
                            data.filter((article) => {
                                return search.toLowerCase() === '' ? article : article.name.toLowerCase().includes(search.toLowerCase()) || article.created.toLowerCase().includes(search.toLowerCase());
                            }).map((article, index) => {
                                return (article?.url?.length > 0 &&
                                    <tr className="docsrow" key={index} >
                                        <td><a href={article.url} target="_blank" className={article?.url?.length > 0 ? "docsrow-link" : ""}>{article.name}</a></td>
                                        <td>{article.created}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
export default Documents;
