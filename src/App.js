import React, { useState } from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Servicos from './pages/Servicos';
import Leads from './pages/Leads';
import Relatorios from './pages/Relatorios';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

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
      case 'seo-sites':
        return <div className="page-placeholder">
          <h2>SEO Sites</h2>
          <p>Módulo de criação e otimização de sites em desenvolvimento...</p>
        </div>;
      case 'google-perfis':
        return <div className="page-placeholder">
          <h2>Google Perfis</h2>
          <p>Módulo de gestão de perfis Google em desenvolvimento...</p>
        </div>;
      case 'trafego-pago':
        return <div className="page-placeholder">
          <h2>Tráfego Pago</h2>
          <p>Módulo de gestão de campanhas em desenvolvimento...</p>
        </div>;
      case 'redes-sociais':
        return <div className="page-placeholder">
          <h2>Redes Sociais</h2>
          <p>Módulo de gestão de redes sociais em desenvolvimento...</p>
        </div>;
      case 'financeiro':
        return <div className="page-placeholder">
          <h2>Financeiro</h2>
          <p>Módulo financeiro em desenvolvimento...</p>
        </div>;
      case 'contratos':
        return <div className="page-placeholder">
          <h2>Contratos</h2>
          <p>Módulo de contratos em desenvolvimento...</p>
        </div>;
      case 'equipe':
        return <div className="page-placeholder">
          <h2>Gestão de Equipe</h2>
          <p>Módulo de gestão de equipe em desenvolvimento...</p>
        </div>;
      case 'metas':
        return <div className="page-placeholder">
          <h2>Metas</h2>
          <p>Módulo de metas em desenvolvimento...</p>
        </div>;
      case 'whatsapp':
        return <div className="page-placeholder">
          <h2>WhatsApp Integrado</h2>
          <p>Módulo de integração WhatsApp em desenvolvimento...</p>
        </div>;
      case 'marketing':
        return <div className="page-placeholder">
          <h2>Marketing Interno</h2>
          <p>Módulo de marketing interno em desenvolvimento...</p>
        </div>;
      case 'precificacao':
        return <div className="page-placeholder">
          <h2>Precificação com IA</h2>
          <p>Módulo de precificação com IA em desenvolvimento...</p>
        </div>;
      case 'sucesso-cliente':
        return <div className="page-placeholder">
          <h2>Sucesso do Cliente</h2>
          <p>Módulo de sucesso do cliente em desenvolvimento...</p>
        </div>;
      case 'otimizacao':
        return <div className="page-placeholder">
          <h2>Entrega de Otimização</h2>
          <p>Módulo de entrega de otimização em desenvolvimento...</p>
        </div>;
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
    </div>
  );
}

export default App;

