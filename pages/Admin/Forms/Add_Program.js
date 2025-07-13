import { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import styles from "@/styles/Modals.module.css";


export default function AddProgram({ onClose }) {
    return (
        <div className={styles.ModalMainBody}>

            <div className={styles.FormBody}>
                <span className={styles.HeaderTitleArea}>
                    <h2>Add Program</h2>
                    <MdIcons.MdSchool size={30}/>
                </span>

                <div className={styles.InputBodyAreaDiv}>
                    <label className={styles.InputTitle}>Title</label>
                    <input className={styles.TypableInput} type="text" required/>

                    <label className={styles.InputTitle}>Code</label>
                    <input className={styles.TypableInput} type="text" required/>

                    <label className={styles.InputTitle}>Program Head</label>
                    <select className={styles.TypableInput} required>
                        <option value=""></option>
                        <option value="FetchStaffList">Ms. Liezel Rodrigo</option>
                    </select>

                    <label className={styles.InputTitle}>Status</label>
                    <select className={styles.TypableInput} required>
                        <option value=""></option>
                        <option value="active">🟢 Active</option>
                        <option value="inactive">🔴 Inactive</option>
                    </select>

                    <span className={styles.SpanFlex}>
                        <button className={styles.AddButton}>Submit</button>
                        <button className={styles.CancelBtn} onClick={onClose}>Cancel</button>
                    </span>
                </div>
                
            </div>


        </div>
    );
};


