import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AuthProvider } from "../../contexts/AuthContext";
import { confirmarCheckout } from "../../services/assinatura";
import AssinaturaSucesso from "./AssinaturaSucesso";

vi.mock("../../services/assinatura", () => ({
  confirmarCheckout: vi.fn(),
}));

describe("AssinaturaSucesso", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("confirma a sessão do Stripe e informa que a assinatura foi ativada", async () => {
    localStorage.setItem("usuario", JSON.stringify({ nome: "Bruno" }));
    confirmarCheckout.mockResolvedValue(true);

    render(
      <MemoryRouter initialEntries={["/assinatura/sucesso?session_id=cs_test_123"]}>
        <AuthProvider>
          <Routes>
            <Route path="/assinatura/sucesso" element={<AssinaturaSucesso />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(await screen.findByText("Assinatura ativada!")).toBeInTheDocument();
    expect(confirmarCheckout).toHaveBeenCalledWith("cs_test_123");
  });
});
