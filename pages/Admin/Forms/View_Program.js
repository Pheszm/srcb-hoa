import { useState } from 'react';
import * as MdIcons from 'react-icons/md';
import styles from "@/styles/Modals.module.css";


export default function ViewProgram({ onClose }) {
    return (
        <div className={styles.ModalMainBody}>

            <div className={styles.FormBody}>
                <span className={styles.HeaderTitleArea}>
                    <h2>Program Information</h2>
                    <MdIcons.MdSchool size={30}/>
                </span> 
                <div className={styles.DivSeparation}>
                    <div className={styles.InputBodyAreaDiv}>
                        <label className={styles.InputTitle}>Title</label>
                        <input className={styles.TypableInput} type="text" value={"Bachelor of Science & Information Technology"} disabled/>

                        <label className={styles.InputTitle}>Code</label>
                        <input className={styles.TypableInput} type="text" value={"BSIT"} disabled/>
                        
                        <label className={styles.InputTitle}>Program Head</label>
                        <input className={styles.TypableInput} type="text" value={"Ms. Liezel Rodrigo"} disabled/>
                    </div>

                    <div className={styles.InputBodyAreaDiv}>
                        <span className={styles.SpanRow}>
                            <span className={styles.SpanColumn}>
                                <label className={styles.InputTitle}>Students</label>
                                <input className={styles.TypableInput} type="text" value={"213"} disabled/>
                            </span>

                            <span className={styles.SpanColumn}>
                                <label className={styles.InputTitle}>Status</label>
                                <input className={styles.TypableInput} type="text" value={"Active 🟢"} disabled/>
                            </span>
                        </span>

                        <label className={styles.InputTitle}>Created At</label>
                        <input className={styles.TypableInput} type="text" value={"DATE & TIME"} disabled/>

                        <label className={styles.InputTitle}>Last Update</label>
                        <input className={styles.TypableInput} type="text" value={"DATE & TIME"} disabled/>
                    </div>
                </div>
                
                <span className={styles.SpanFlex}>
                    <p/>
                    <button className={styles.CancelBtn} onClick={onClose}>Close</button>
                </span>
            </div>


        </div>
    );
};


