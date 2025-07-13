import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "@/styles/Homepage.module.css";
import * as MdIcons from 'react-icons/md';
import LoginForm from "./login_form";


export default function Homepage(){

  const handleScroll = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center', 
        inline: 'nearest',
      });
    }
  };


  const [SelectedForm, setSelectedForm] = useState("");
  const handlePage = (page) => {
    setSelectedForm(page);
  };
  const handleFormClose = () => {
    setSelectedForm("");
  };




  return (
    <div className={styles.HomepageMainBody}>

      <title>Home | HED Online Assessment</title>

      {/* HEADER PART */}
      <header className={`${styles.HeaderBar}`}>
        <span className={styles.SpanFlex}>
          <img src="/Assets/SRCB_Logo.png" className="w-11"/>
          <h1 className={styles.textTitle}>SRCB HED</h1> 
        </span>

        <span className={styles.NavigationBtnSpan}>
          <a href="#Hero" onClick={(e) => { e.preventDefault(); handleScroll('Hero'); }}
            >Home</a>
          <a href="#HeroLower" onClick={(e) => { e.preventDefault(); handleScroll('HeroLower'); }}
            >Features</a>
          <a href="#About" onClick={(e) => { e.preventDefault(); handleScroll('About'); }}
            >About</a>
          <button className={styles.CommonButton} onClick={() => handlePage("LoggingIn")}>Login</button>
        </span>
      </header>

      {SelectedForm === "LoggingIn" && (
        <div className={styles.BlurryBackground}>
          <LoginForm onClose={handleFormClose} />
        </div>
      )}



      {/* HERO SECTION */}
      <section id="Hero" className={styles.HeroSection}>
        <h1>SRCB Higher Education <br/> Online Assessment</h1>
        <p>A secure platform for online student evaluation at SRCB Higher Education Program.</p>
        <br/>
        <span className={styles.SpanFlex}>
          <button className={styles.CommonButton} onClick={() => handlePage("LoggingIn")}>Start Now</button>
          <button className={styles.RareButton} onClick={(e) => { e.preventDefault(); handleScroll('About'); }}>Read More</button>
        </span>
      </section>

      <section id="HeroLower" className={styles.SectionArea}>
        <h2 className={styles.HeroLowerTitle}>Equipped with Anti-Cheating Features</h2>
        
        <div className={styles.HeroLowerFlex}>
          <span className={`${styles.SpanFlex} ${styles.HeroLowerBoxDesign}`}>
            <MdIcons.MdRemoveRedEye size={45} />
            <p>Eye Tracking</p>
          </span>

          <span className={`${styles.SpanFlex} ${styles.HeroLowerBoxDesign}`}>
            <MdIcons.MdFace size={45} />
            <p>Facial Recognition</p>
          </span>

          <span className={`${styles.SpanFlex} ${styles.HeroLowerBoxDesign}`}>
            <MdIcons.MdShuffle size={45} />
            <p>Item Randomization</p>
          </span>

          <span className={`${styles.SpanFlex} ${styles.HeroLowerBoxDesign}`}>
            <MdIcons.MdLock size={45} />
            <p>Website Lockdown</p>
          </span>
        </div>
      </section>




      {/* ABOUT SECTION */}
      <section id="About" className={styles.SectionArea}> 
        <h2 className={styles.AboutTitle}> <span className={styles.LineInTitle}/>ABOUT <span className={styles.LineInTitle}/></h2>
        <div className={styles.AboutMainDiv}>
          <div className={styles.AboutContentArea}>
            <h3 className={styles.AboutHeader}>SRCB HED Online Assessment</h3>
            <p>At St. Rita’s College of Balingasag, we aim to enhance the integrity of online assessments. Recognizing challenges like cheating and identity fraud, we are developing an "Online Assesment Monitoring with Eye Tracking and Facial Recognition" system. This innovative solution will strengthen security by verifying identities and monitoring student behavior during exams, ensuring fairness and accuracy.</p>
          </div>

          <div>
          <img src="/Assets/Exam-Hero-Img.png" className="w-120"/>
          </div>
        </div>
        </section>




      {/* FOOTER SECTION */}
      <footer id="Footer" className={styles.FooterArea}>
        <span className={styles.CustomLine}/>
        <div className={styles.FooterContentFlex}>
          <p>© Copyright <strong>SRCB HED Online Assessment</strong> All Rights Reserved</p>
          
          <div className={styles.LinkArea} >
            <a className={styles.LinkButtons} href="https://www.facebook.com/HigherEdSrcb" target="_blank" rel="noopener noreferrer">
              <MdIcons.MdFacebook size={45} />
            </a>

            <a className={styles.LinkButtons} href="tel:+63XXXXXXXXXX" target="_blank" rel="noopener noreferrer">
              <MdIcons.MdPhone size={40} />
            </a>

            <a className={styles.LinkButtons} href="mailto:example@email.com" target="_blank" rel="noopener noreferrer">
              <MdIcons.MdEmail size={44} />
            </a>
          </div>
          
        </div>

      </footer>

    </div>  
  );
};