import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { confirmarCheckout } from "../../services/assinatura";

function AssinaturaSucesso() {
  const [searchParams] = useSearchParams();
  const { usuario } = useAuth();
  const sessionId = searchParams.get("session_id");
  const [estado, setEstado] = useState("verificando");

  async function verificarPagamento() {
    setEstado("verificando");
    try {
      const ativa = await confirmarCheckout(sessionId);
      setEstado(ativa ? "ativa" : "pendente");
    } catch {
      setEstado("erro");
    }
  }

  useEffect(() => {
    if (!sessionId) {
      setEstado("sessao-ausente");
      return;
    }
    if (!usuario) {
      setEstado("login-necessario");
      return;
    }

    let ativa = true;
    confirmarCheckout(sessionId)
      .then((confirmada) => {
        if (ativa) setEstado(confirmada ? "ativa" : "pendente");
      })
      .catch(() => {
        if (ativa) setEstado("erro");
      });

    return () => {
      ativa = false;
    };
  }, [sessionId, usuario]);

  return (
    <main className="container">
      {estado === "verificando" && <p>Confirmando seu pagamento...</p>}
      {estado === "ativa" && (
        <>
          <h1>Assinatura ativada!</h1>
          <p>Seu acesso às matérias exclusivas já está liberado.</p>
          <Link to="/">Voltar à capa</Link>
        </>
      )}
      {estado === "pendente" && (
        <>
          <h1>Pagamento em processamento</h1>
          <p>O Stripe ainda está confirmando o pagamento. Tente novamente em instantes.</p>
          <button onClick={verificarPagamento}>Verificar novamente</button>
        </>
      )}
      {estado === "erro" && (
        <>
          <h1>Não foi possível confirmar agora</h1>
          <p>Seu pagamento pode ter sido concluído. Tente verificar novamente em instantes.</p>
          <button onClick={verificarPagamento}>Tentar novamente</button>
        </>
      )}
      {estado === "login-necessario" && (
        <>
          <h1>Entre para confirmar sua assinatura</h1>
          <p>Use a mesma conta Clarim usada antes de iniciar o pagamento.</p>
          <Link to="/login">Entrar</Link>
        </>
      )}
      {estado === "sessao-ausente" && (
        <>
          <h1>Sessão de pagamento não encontrada</h1>
          <Link to="/">Voltar à capa</Link>
        </>
      )}
    </main>
  );
}

export default AssinaturaSucesso;
