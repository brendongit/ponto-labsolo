import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { formatDate, getDayType } from "../utils/dateUtils";
import {
  CalendarIcon,
  ClockIcon,
  DollarSignIcon,
  ListIcon,
  UserIcon,
} from "./PDFIcons";

// Estilos CSS-like para o PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },

  // Header
  header: {
    backgroundColor: "#3B82F6",
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    color: "#ffffff",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 11,
    marginBottom: 8,
  },
  headerInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerInfo: {
    fontSize: 9,
    opacity: 0.9,
  },
  headerDate: {
    fontSize: 8,
    marginTop: 4,
    opacity: 0.8,
  },

  // Cards de Resumo
  cardsContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderStyle: "solid",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  cardLabel: {
    fontSize: 8,
    color: "#6B7280",
    textTransform: "uppercase",
  },
  cardValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
  },
  cardDetails: {
    fontSize: 7,
    color: "#6B7280",
    marginTop: 4,
    lineHeight: 1.3,
  },

  // Seção
  section: {
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 2,
    borderBottomColor: "#3B82F6",
    borderBottomStyle: "solid",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1F2937",
  },

  // Tabela
  table: {
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#3B82F6",
    padding: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableHeaderCell: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
    padding: 8,
  },
  tableRowAlt: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    borderBottomStyle: "solid",
    padding: 8,
  },
  tableCell: {
    fontSize: 8,
    color: "#374151",
    textAlign: "center",
  },
  tableCellLocation: {
    fontSize: 8,
    color: "#374151",
    textAlign: "left",
  },
  statusPaid: {
    color: "#10B981",
    fontWeight: "bold",
  },
  statusUnpaid: {
    color: "#EF4444",
    fontWeight: "bold",
  },

  // Totalizadores
  totalizersBox: {
    backgroundColor: "#F3F4F6",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  totalizerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  totalizerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalizerLabel: {
    fontSize: 9,
    color: "#374151",
  },
  totalizerValue: {
    fontSize: 9,
    fontWeight: "bold",
  },
  totalizerValuePurple: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#A855F7",
  },
  totalizerValueOrange: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#FB923C",
  },
  totalizerValueBlue: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  totalizerValueGreen: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#10B981",
  },
  totalizerValueRed: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#EF4444",
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    borderTopStyle: "solid",
    marginVertical: 6,
  },
  lightSeparator: {
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    borderTopStyle: "solid",
    marginVertical: 3,
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    borderTopStyle: "solid",
    fontSize: 7,
    color: "#6B7280",
  },
});

// Componente do PDF
const PDFDocument = ({
  userName,
  records,
  monthName,
  hoursByDay,
  uberTotals,
  totalHours,
  payment,
}) => {
  const now = new Date();
  const generatedDate = `${now.toLocaleDateString(
    "pt-BR"
  )} às ${now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>MeuPonto</Text>
          <Text style={styles.headerSubtitle}>
            Relatório de Registro de Ponto
          </Text>
          <View style={styles.headerInfoContainer}>
            <UserIcon size={10} color="#E0E7FF" />
            <Text style={styles.headerInfo}>
              {userName} • {monthName}
            </Text>
          </View>
          <Text style={styles.headerDate}>Gerado em {generatedDate}</Text>
        </View>

        {/* Cards de Resumo - Primeira Linha */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <ClockIcon size={10} color="#10B981" />
              <Text style={styles.cardLabel}>Total de Horas</Text>
            </View>
            <Text style={styles.cardValue}>{totalHours}</Text>
            <Text style={styles.cardDetails}>
              Sábados: {hoursByDay.saturday} | Domingos: {hoursByDay.sunday}
              {"\n"}
              Feriados: {hoursByDay.holiday} | Normais: {hoursByDay.weekday}
            </Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <DollarSignIcon size={10} color="#A855F7" />
              <Text style={styles.cardLabel}>Total de Uber</Text>
            </View>
            <Text style={styles.cardValue}>
              R$ {uberTotals.total.toFixed(2)}
            </Text>
            <Text style={styles.cardDetails}>
              Pago: R$ {uberTotals.paid.toFixed(2)} | Não pago: R${" "}
              {uberTotals.unpaid.toFixed(2)}
            </Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <DollarSignIcon size={10} color="#F59E0B" />
              <Text style={styles.cardLabel}>Pagamento</Text>
            </View>
            <Text style={styles.cardValue}>
              R$ {payment.total.toFixed(2)}
            </Text>
            <Text style={styles.cardDetails}>
              Semana: R$ {payment.weekday.toFixed(2)} | Sáb: R$ {payment.saturday.toFixed(2)}
              {"\n"}
              Dom: R$ {payment.sunday.toFixed(2)} | Fer: R$ {payment.holiday.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Cards de Resumo - Segunda Linha */}
        <View style={[styles.cardsContainer, { marginTop: 10 }]}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <CalendarIcon size={10} color="#3B82F6" />
              <Text style={styles.cardLabel}>Dias Trabalhados</Text>
            </View>
            <Text style={styles.cardValue}>{records.length} dias</Text>
          </View>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <ClockIcon size={10} color="#6B7280" />
              <Text style={styles.cardLabel}>Valor Hora Base</Text>
            </View>
            <Text style={styles.cardValue}>
              {payment.hourValue > 0 ? `R$ ${payment.hourValue.toFixed(2)}/h` : '-'}
            </Text>
            {payment.hourValue > 0 && (
              <Text style={styles.cardDetails}>
                Sáb 70% | Dom 100% | Feriado 100%
              </Text>
            )}
          </View>
        </View>

        {/* Tabela de Registros */}
        <View style={styles.section}>
          <View style={styles.sectionTitleContainer}>
            <ListIcon size={14} color="#3B82F6" />
            <Text style={styles.sectionTitle}>Registros do Período</Text>
          </View>

          <View style={styles.table}>
            {/* Cabeçalho */}
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { width: "13%" }]}>
                Data
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "10%" }]}>
                Entrada
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "10%" }]}>
                Saída
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "10%" }]}>
                Duração
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "11%" }]}>
                Uber
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "11%" }]}>
                Status
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "13%" }]}>
                Tipo de Dia
              </Text>
              <Text style={[styles.tableHeaderCell, { width: "22%" }]}>
                Local
              </Text>
            </View>

            {/* Linhas */}
            {records.map((record, index) => {
              const dayType = getDayType(record.date);
              let dayTypeLabel = "Dia de semana";
              let dayTypeColor = "#3B82F6";

              if (record.isHoliday) {
                dayTypeLabel = "Feriado";
                dayTypeColor = "#F59E0B";
              } else if (dayType === 'saturday') {
                dayTypeLabel = "Sábado";
                dayTypeColor = "#A855F7";
              } else if (dayType === 'sunday') {
                dayTypeLabel = "Domingo";
                dayTypeColor = "#FB923C";
              }

              return (
                <View
                  key={record.id}
                  style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
                >
                  <Text style={[styles.tableCell, { width: "13%" }]}>
                    {formatDate(record.date)}
                  </Text>
                  <Text style={[styles.tableCell, { width: "10%" }]}>
                    {record.entry || "-"}
                  </Text>
                  <Text style={[styles.tableCell, { width: "10%" }]}>
                    {record.exit || "-"}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: "10%", fontWeight: "bold" },
                    ]}
                  >
                    {record.duration || "-"}
                  </Text>
                  <Text style={[styles.tableCell, { width: "11%" }]}>
                    {record.uberCost > 0
                      ? `R$ ${record.uberCost.toFixed(2)}`
                      : "-"}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      { width: "11%" },
                      record.uberCost > 0
                        ? record.paid
                          ? styles.statusPaid
                          : styles.statusUnpaid
                        : {},
                    ]}
                  >
                    {record.uberCost > 0
                      ? record.paid
                        ? "Pago"
                        : "Não pago"
                      : "-"}
                  </Text>
                  <Text
                    style={[
                      styles.tableCell,
                      {
                        width: "13%",
                        color: dayTypeColor,
                        fontWeight: record.isHoliday || dayType !== 'weekday' ? 'bold' : 'normal',
                      },
                    ]}
                  >
                    {dayTypeLabel}
                  </Text>
                  <Text style={[styles.tableCellLocation, { width: "22%" }]}>
                    {record.location || "-"}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>MeuPonto - Sistema de Registro de Ponto Digital</Text>
          <Text>Página 1 de 1</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
