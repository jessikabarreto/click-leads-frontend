import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Servicos from './pages/Servicos';
import Leads from './pages/Leads';
import Relatorios from './pages/Relatorios';
import PortfolioServicos from './pages/PortfolioServicos';
import GestaoInterna from './pages/GestaoInterna';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DisneyMascot from './components/DisneyMascot';
import EducacaoContinuada from './components/EducacaoContinuada';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'clientes':
        return <Clientes />;
      case 'servicos':
        return <Servicos />;
      case 'leads':
        return <Leads />;
      case 'relatorios':
        return <Relatorios />;
      
      // Portfólio de Serviços
      case 'seo-sites':
        return <PortfolioServicos categoria="seo_sites" />;
      case 'google-perfil':
        return <PortfolioServicos categoria="google_perfil" />;
      case 'redes-sociais':
        return <PortfolioServicos categoria="redes_sociais" />;
      case 'trafego-pago':
        return <PortfolioServicos categoria="trafego_pago" />;
      
      // Gestão Interna
      case 'captacao-leads-interno':
        return <GestaoInterna categoria="captacao_leads" />;
      case 'sucesso-cliente':
        return <GestaoInterna categoria="sucesso_cliente" />;
      case 'relatorios-interno':
        return <GestaoInterna categoria="relatorios" />;
      case 'gestao-equipe':
        return <GestaoInterna categoria="gestao_equipe" />;
      case 'contratos':
        return <GestaoInterna categoria="contratos" />;
      case 'financeiro':
        return <GestaoInterna categoria="financeiro" />;
      case 'precificacao-ia':
        return <GestaoInterna categoria="precificacao_ia" />;
      case 'metas':
        return <GestaoInterna categoria="metas" />;
      case 'marketing-interno':
        return <GestaoInterna categoria="marketing_interno" />;
      case 'whatsapp':
        return <GestaoInterna categoria="whatsapp" />;
      case 'entrega-otimizacao':
        return <GestaoInterna categoria="entrega_otimizacao" />;
      
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="page-content">
          {renderPage()}
        </main>
      </div>
      
      {/* Componentes de experiência Disney */}
      <DisneyMascot />
      <EducacaoContinuada currentPage={currentPage} />
    </div>
  );
}

export default App;

