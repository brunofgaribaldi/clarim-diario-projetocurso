import { useState, useEffect } from "react";
import NewsCard from "../../components/NewsCard/NewsCard";
import { listarNoticias } from "../../services/noticias";
import "./Home.css";

function Home() {
  const [noticias, setNoticias] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");
        const dados = await listarNoticias();
        setNoticias(dados);
      } catch {
        setErro("Não foi possível carregar as notícias");
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  if (carregando) return <p className="aviso-tela">Carregando a edição...</p>;
  if (erro) return <p className="aviso-tela">{erro}</p>;

  const [manchete, ...demais] = noticias;

  return (
    <main className="container">
      <section className="manchete">
        <NewsCard
          id={manchete.id}
          categoria={manchete.categoria}
          titulo={manchete.titulo}
          resumo={manchete.resumo}
        />
      </section>

      <section className="grade">
        {demais.map((noticia) => (
          <NewsCard
            id={noticia.id}
            categoria={noticia.categoria}
            titulo={noticia.titulo}
            resumo={noticia.resumo}
          />
        ))}
      </section>
    </main>
  );
}

export default Home;
