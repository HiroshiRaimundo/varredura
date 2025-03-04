
import { JournalistContact, CompanyContact } from "../types/contactTypes";

export const mockJournalists: JournalistContact[] = [
  {
    id: "1",
    name: "Maria Silva",
    type: "journalist",
    email: "maria.silva@jornal.com",
    phone: "(11) 98765-4321",
    socialMedia: "@mariasilva",
    company: "Jornal Nacional",
    position: "Editora de Economia",
    notes: "Interesse em pautas de economia e negócios."
  },
  {
    id: "2",
    name: "João Pereira",
    type: "journalist",
    email: "joao.pereira@noticias.com",
    phone: "(21) 99876-5432",
    socialMedia: "@joaopereira",
    company: "Portal de Notícias G1",
    position: "Repórter de Tecnologia",
    notes: "Especializado em coberturas de tecnologia e inovação."
  }
];

export const mockCompanies: CompanyContact[] = [
  {
    id: "3",
    name: "Grupo Folha",
    type: "company",
    email: "contato@folha.com.br",
    phone: "(11) 3333-4444",
    socialMedia: "@grupofolha",
    notes: "Maior grupo de mídia impressa do país."
  },
  {
    id: "4",
    name: "Rede Globo",
    type: "company",
    email: "imprensa@globo.com",
    phone: "(21) 2555-7777",
    socialMedia: "@redeglobo",
    notes: "Principal rede de televisão."
  }
];
