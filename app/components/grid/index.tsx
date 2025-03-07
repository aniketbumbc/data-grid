"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from './Grid.module.css';
import data from '../../mock-data/sample.json';
import { GridItem } from '../../types/type';


export default function Grid() {
    /**
     *  Need this to use a single state object for the checkboxes
     */
    const [checkboxes, setCheckboxes] = useState(
        data.reduce((acc, item) => {
            acc[item.name] = false;
            return acc;
        }, {})
    );

    /**
     *  Need this to use a on single click to select all checkboxes
     */
    const [selectAll, setSelectAll] = useState(false);

    /**
     *  Need this for to check intermidiate state of the checkboxes
     */
    const selectAllRef = useRef(null);


    /**
     *  Need this to store the selected rows for the download
     */
    const [selectedRows, setSelectedRows] = useState<GridItem[]>([]);


    /**
     *  Handle the select all checkbox accept event and update 
     *  the state of the checkboxes and the select all checkbox
     * @param event 
     */
    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const isChecked = event.target.checked;
        setSelectAll(isChecked);
        setSelectedRows([]);
        setCheckboxes(
            data.reduce((acc, item) => {
                acc[item.name] = isChecked;
                return acc;
            }, {})
        );

    };

    /**
     *  Handle the checkbox change event and update the intermidiate state of the checkboxes and 
     *  the return the new state of the checkboxes
     * @param event 
     */
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, item: GridItem): void => {
        const { name, checked } = event.target;
        // Update selected rows
        setSelectedRows((prev) => {
            if (checked) {
                return [...prev, item];
            }
            return prev.filter((row) => row.name !== item.name);
        });

        setCheckboxes((prevState) => {
            const newState = { ...prevState, [name]: checked };

            // Check if all checkboxes are selected
            const allSelected = Object.values(newState).every((value) => value);
            const someSelected = Object.values(newState).some((value) => value);

            setSelectAll(allSelected);

            // Set indeterminate state if not all and not none are selected
            if (selectAllRef.current) {
                selectAllRef.current.indeterminate = someSelected && !allSelected;
            }
            return newState;
        });
    }


    useEffect(() => {
        if (selectAllRef.current) {
            const someSelected = Object.values(checkboxes).some((value) => value);
            const allSelected = Object.values(checkboxes).every((value) => value);
            selectAllRef.current.indeterminate = someSelected && !allSelected;
        }
    }, [checkboxes]);


    /**
     *  Calculate the number of checkboxes that are selected
     * @returns number
     */
    const checkBoxSelectedCount = (): number => {
        const selectedCount = Object.values(checkboxes).filter((value) => value).length;
        return selectedCount;
    }


    const allAvailable = selectedRows.length > 0 && selectedRows.every((item) => item.status === "available");



    /**
     *  Show the alert message for the download with the selected rows
     */
    const showAlert = (): void => {
        let alertMessage = 'Downloading the following files : \n';
        if (allAvailable) {
            selectedRows.forEach((item) => {
                alertMessage += `Name :${item.name} Device :${item.device} Path :${item.path} \n`
            });
            alert(alertMessage);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td colSpan={6} className={styles.headerRow}>
                                <div className={styles.flexContainer}>
                                    <input type="checkbox" checked={selectAll}
                                        ref={selectAllRef}
                                        onChange={handleSelectAllChange} />   {checkBoxSelectedCount() > 0 ? <span> {checkBoxSelectedCount()} Selected</span> : <span>Non Selected</span>}
                                    <div className={allAvailable ? styles.downloadText : styles.normalText} onClick={showAlert} >Download Selected</div>
                                </div>
                            </td>
                        </tr>
                        <tr className={styles.tableTr}>
                            <th className={styles.tableTh}></th>
                            <th className={styles.tableTh}>Name</th>
                            <th className={styles.tableTh}>Device</th>
                            <th className={styles.tableTh}>Path</th>
                            <th className={styles.tableTh}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((item, index) => (
                                <tr key={index} className={styles.tableTr}>
                                    <td><>
                                        <input type="checkbox" name={item.name}
                                            checked={checkboxes[item.name]}
                                            onChange={(event) => handleCheckboxChange(event, item)} />
                                    </></td>
                                    <td className={styles.tableTd}>{item.name}</td>
                                    <td className={styles.tableTd}>{item.device}</td>
                                    <td className={styles.tableTd}>{item.path}</td>
                                    <td className={styles.tableTd}>{item.status === "available" ? <div className={styles.circleTextContainer}> <div className={styles.greenCircle}></div><span>{item.status}</span></div> : <div>{item.status}</div>}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}