import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "../../contexts/AuthContext";
import { buscarNoticia } from "../../services/noticias";
import Materia from "./Materia";

vi.mock("../../services/noticias", () => ({
  buscarNoticia: vi.fn(),
}));

describe("Materia", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("não mostra o conteúdo premium bloqueado e oferece cadastro", async () => {
    buscarNoticia.mockResolvedValue({
      id: 1,
      titulo: "Matéria exclusiva",
      resumo: "Resumo público",
      categoria: "Cidade",
      texto: null,
      premium: true,
      bloqueada: true,
    });

    render(
      <MemoryRouter initialEntries={["/materia/1"]}>
        <AuthProvider>
          <Routes>
            <Route path="/materia/:id" element={<Materia />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByText("Esta matéria é exclusiva para assinantes.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Cadastre-se para assinar" })).toHaveAttribute(
      "href",
      "/cadastro",
    );
    expect(screen.queryByText("Conteúdo completo")).not.toBeInTheDocument();
  });
});
