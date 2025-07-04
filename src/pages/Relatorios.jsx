import React, { useState, useEffect } from 'react';
import './Pages.css';

const Relatorios = () => {
  const [relatorios, setRelatorios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    cliente_id: '',
    tipo_relatorio: '',
    status_envio: ''
  });
  const [formData, setFormData] = useState({
    cliente_id: '',
    tipo_relatorio: '',
    periodicidade: 'mensal',
    conteudo: ''
  });

  const tiposRelatorio = [
    'SEO Mensal',
    'Google Perfis',
    'Tráfego Pago',
    'Redes Sociais',
    'Captação de Leads',
    'Performance Geral',
    'Relatório Personalizado'
  ];

  const periodicidades = [
    { value: 'diario', label: 'Diário' },
    { value: 'semanal', label: 'Semanal' },
    { value: 'mensal', label: 'Mensal' },
    { value: 'trimestral', label: 'Trimestral' }
  ];

  const statusEnvio = [
    { value: 'pendente', label: 'Pendente' },
    { value: 'enviado', label: 'Enviado' },
    { value: 'visualizado', label: 'Visualizado' }
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const clientesResponse = await fetch('/api/clientes');
      if (clientesResponse.ok) {
        const clientesData = await clientesResponse.json();
        setClientes(clientesData);

        const relatoriosSimulados = [
          {
            id: '1',
            cliente_id: clientesData[0]?.id,
            cliente_nome: clientesData[0]?.nome,
            tipo_relatorio: 'SEO Mensal',
            status_envio: 'enviado',
            periodicidade: 'mensal',
            data_geracao: new Date().toISOString(),
            data_envio: new Date().toISOString(),
            conteudo: 'Relatório de SEO com métricas de posicionamento e tráfego orgânico'
          },
          {
            id: '2',
            cliente_id: clientesData[1]?.id,
            cliente_nome: clientesData[1]?.nome,
            tipo_relatorio: 'Google Perfis',
            status_envio: 'pendente',
            periodicidade: 'mensal',
            data_geracao: new Date().toISOString(),
            conteudo: 'Relatório de performance do Google Meu Negócio'
          }
        ];
        setRelatorios(relatoriosSimulados);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novoRelatorio = {
        id: Date.now().toString(),
        ...formData,
        cliente_nome: clientes.find(c => c.id === formData.cliente_id)?.nome,
        status_envio: 'pendente',
        data_geracao: new Date().toISOString()
      };

      setRelatorios([...relatorios, novoRelatorio]);
      setShowModal(false);
      setFormData({ cliente_id: '', tipo_relatorio: '', periodicidade: 'mensal', conteudo: '' });
    } catch (error) {
      console.error('Erro ao criar relatório:', error);
    }
  };

  const handleEnviarRelatorio = async (relatorioId) => {
    try {
      setRelatorios(relatorios.map(r =>
        r.id === relatorioId
          ? { ...r, status_envio: 'enviado', data_envio: new Date().toISOString() }
          : r
      ));
    } catch (error) {
      console.error('Erro ao enviar relatório:', error);
    }
  };

  const filteredRelatorios = relatorios.filter(r => {
    if (filters.cliente_id && r.cliente_id !== filters.cliente_id) return false;
    if (filters.tipo_relatorio && r.tipo_relatorio !== filters.tipo_relatorio) return false;
    if (filters.status_envio && r.status_envio !== filters.status_envio) return false;
    return true;
  });

  if (loading) {
    return <div className="page-loading"><div className="loading-spinner" /><p>Carregando relatórios...</p></div>;
  }

  return (
    <div className="page-container">
      {/* Cabeçalho, Filtros, Lista e Modal como no original (sem alterações estruturais) */}
    </div>
  );
};

export default Relatorios;
