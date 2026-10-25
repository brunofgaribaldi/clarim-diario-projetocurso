import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="rodape">
      <p className="rodape__marca">O Clarim Diário</p>
      <p className="rodape__fundacao">Nova York · Fundado em 1897</p>

      <nav className="rodape__links">
        <Link to="/">Capa</Link>
        <a href="#">Expediente</a>
        <a href="#">Anuncie</a>
        <a href="#">Privacidade</a>
        <Link to="/cadastro">Assine</Link>
      </nav>

      <p className="rodape__creditos">
        © {ano} O Clarim Diário. Todos os direitos reservados. Opiniões sobre
        vigilantes mascarados são de inteira responsabilidade do editor-chefe.
      </p>
    </footer>
  );
}

export default Footer;
