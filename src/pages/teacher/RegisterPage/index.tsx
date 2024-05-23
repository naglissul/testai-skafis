import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [terms, setTerms] = useState<boolean>(false);

  const registerUser = async (event: any) => {
    event.preventDefault();
    if (email === "" || password === "" || confirmPassword === "") {
      alert("Prašome užpildyti visus laukus");
      return;
    }
    if (password !== confirmPassword) {
      alert("Slaptažodžiai nesutampa");
      return;
    }
    if (!terms) {
      alert("Prašome sutikti su taisyklėmis");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sėkmingai užregistruota!");
      navigate("/login");
    } catch (error: any) {
      console.error("Error registering user: ", error);
      alert("Klaida: " + error.message);
    }
  };

  return (
    <div className="centered-input-page-container">
      <form className="mb-4" onSubmit={registerUser}>
        <h1>Mokytojo registracija</h1>
        <h2>
          Šiuo metu savarankiška registracija išjungta, nes platforma nėra
          stabili. Dėl platformos naudojimo kreipkitės į sistemos
          administratorių el. paštu{" "}
          <a href="mailto:naglis.suliokas@gmail.com">
            naglis.suliokas@gmail.com
          </a>
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern="[^?]*"
          placeholder="Įveskite el. paštą"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Įveskite slaptažodį"
          required
        />
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Pakartokite slaptažodį"
          required
        />
        <input
          type="checkbox"
          value={terms.toString()}
          onChange={(e) => setTerms(e.target.checked)}
          required
        />
        <label>
          Sutinku su{" "}
          <a href="/terms" target="_blank">
            taisyklėmis
          </a>{" "}
          (prašau, perskaitykit...)
        </label>
        <button type="submit">Registruotis</button>{" "}
      </form>
      <p>
        Jau turite paskyrą? <a href="/login">Prisijungti</a>
      </p>
    </div>
  );
};

export default RegisterPage;
