import { useState, useEffect } from 'react';
import * as AiIcons from 'react-icons/ai';
import styles from "@/styles/Modals.module.css";
import { QR_Login } from "@/components/QR_Scanner";
import { useRouter } from 'next/router';

export default function LoginForm( { onClose } ) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
    console.log({ email, password });
  };



  const [isScanning, setIsScanning] = useState(false);
    const toggleScan = () => {
      setIsScanning(prev => !prev);
    };
  
    const handleScanSuccess = (decodedText) => {
      console.log("QR Code Scanned:", decodedText);
      QRLoginProcess(decodedText);
      toggleScan();
    };


    const GotoLogin = () => {
      router.push('/Admin');
    };
  return (
    <div className={styles.ModalMainBody}>

      <div className={`${styles.LoginFormBody}`}>

        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-800">
          <AiIcons.AiOutlineClose size={20} />
        </button>


        <div className={styles.LoginLeftSide}>
          <img src="/Assets/SideLoginForm.png" alt="Description" className="w-full h-auto" />
        </div>

        <div className={styles.LoginRightSide}>
          
          <span className={styles.HeaderTitleArea}>
            <img src="/Assets/SRCB_Logo.png" className="w-11 h-11"/>
            <h1>LOGIN</h1>
          </span>

          <form onSubmit={handleSubmit} className="space-y-5">
          <div className={styles.SpanColumn}>
            <label className={styles.InputTitle}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.TypableInput}
              />
          </div>

          <div>
            <label className={styles.InputTitle}>Password</label>
            <div className={`${styles.SpanColumn} relative`}>
              <input
                type={showPass ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`${styles.TypableInput} transition-all duration-200`}   
                />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2 text-gray-500 focus:outline-none focus:text-blue-700"
              >
                {showPass ? (
                  <AiIcons.AiFillEyeInvisible size={20} />
                ) : (
                  <AiIcons.AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="form-checkbox text-blue-800 focus:ring-blue-900"
              />
              <span>Remember me</span>
            </label>
          </div>

          <button type="submit" className={styles.LoginButton} onClick={GotoLogin}>
            Log In
          </button>
        </form>

        <button onClick={toggleScan}
        className="pt-1 bg-transparent border-none text-sm text-blue-800 hover:text-blue-900 underline cursor-pointer text-lg p-0"
        ></button>
      </div>

        </div>


      {isScanning && (
        <div className={styles.OverlayBackground}>
          <div className={`${styles.FormBody} shadow-md w-full max-w-md`}>
            <button
              onClick={toggleScan}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              <AiIcons.AiOutlineClose size={20} />
            </button>
            <QR_Login ScanningStatus={isScanning} onScanSuccess={handleScanSuccess} />
          </div>
        </div>
      )}

    </div>
  );
}
