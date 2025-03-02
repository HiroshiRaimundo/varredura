
export const generateMockData = () => {
  return {
    releaseStats: {
      published: Math.floor(Math.random() * 20) + 10,
      pending: Math.floor(Math.random() * 8) + 2,
      approved: Math.floor(Math.random() * 15) + 5,
      rejected: Math.floor(Math.random() * 5)
    },
    monthlyData: [65, 59, 80, 81, 56, 55, 40, 55, 60, 70, 45, 55],
    mediaOutlets: [
      { name: "Jornal Nacional", count: Math.floor(Math.random() * 10) + 3 },
      { name: "Folha de São Paulo", count: Math.floor(Math.random() * 10) + 2 },
      { name: "G1", count: Math.floor(Math.random() * 10) + 5 },
      { name: "Estado de São Paulo", count: Math.floor(Math.random() * 10) + 1 },
      { name: "UOL", count: Math.floor(Math.random() * 10) + 4 }
    ],
    recentReleases: [
      {
        id: "1",
        title: "Lançamento da nova pesquisa sobre saúde pública",
        date: "2024-05-12",
        status: "published"
      },
      {
        id: "2",
        title: "Dados sobre desenvolvimento sustentável",
        date: "2024-05-10",
        status: "pending"
      },
      {
        id: "3",
        title: "Relatório de impacto social 2024",
        date: "2024-05-08",
        status: "approved"
      }
    ]
  };
};

export default generateMockData;
