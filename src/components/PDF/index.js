import jsPDF from "jspdf";
import logo from '../../assets/logo_monarca.jpg';
import roomIcon from '../../assets/roomIcon.jpg';
import contracIcon from '../../assets/contractIcon.png';
import moment from "moment";

const parseBaggage = {
  true: 'Sí',
  false: 'No',
};

const parseWayToPay = {
  cash: 'Efectivo',
  card: 'Tarjeta',
};

export const generatePDF = (contract) => {
  console.log('xxx pdf data contract: ', contract);
  const {
    origin, destiny, country, profession, company, nit, birthday, room, departureDate,
    phone, email, rate, baggage, wayToPay, renters, dateOfAdmission, codeContract, contractStatus
  } = contract || {};

  // Dates
  const date = moment().format('LLLL');
  const birthdate = moment(birthday).format('ll');
  const admissionDate = moment(dateOfAdmission).format('DD/MM/YYYY, h:mm a');
  const departure = moment(departureDate).format('DD/MM/YYYY, h:mm a');
  const countHuespeds = Object.keys(renters).length;

  const doc = new jsPDF('landscape', 'px', 'a5', 'false');

  // Hotel logo
  doc.addImage(logo, 'JPG', 15, 10, 80, 80 );

  // Typography
  doc.setFontSize(12);
  doc.setFont("arial", "normal");

  // Origin - Destiny - Country
  doc.text(`Procedencia: ${origin || 'No'}`, 20, 100);
  doc.text(`Destino: ${destiny || 'No'}`, 175, 100);
  doc.text(`País: ${country || 'No'}`, 318, 100);

  // Profession - Company - NIT
  doc.text(`Profesión: ${profession || 'No'}`, 20, 119);
  doc.text(`Empresa: ${company || 'No'}`, 175, 119);
  doc.text(`NIT: ${nit || 'No'}`, 318, 119);

  // Birthdate - Phone - Email
  doc.text(`Email: ${email || 'No'}`, 20, 138);
  doc.text(`Cumpleaños: ${birthdate || 'Sin fecha'}`, 175, 138);
  doc.text(`Teléfono: ${phone || 'No'}`, 318, 138);

  // Addmission date - Departure date - Rate / Price
  doc.text(`Fecha ingreso: ${admissionDate}`, 20, 156);
  doc.text(`Fecha salida: ${contractStatus === 'finished' ? departure : ''}`, 175, 156);
  doc.text(`Precio: $ ${rate} Pesos`, 318, 156);

  // Baggage - Way to pay
  doc.text(`Maletas: ${parseBaggage[baggage]}`, 20, 175);
  doc.text(`Modo de pago: ${parseWayToPay[wayToPay]}`, 175, 175);
  doc.text(`N° Huesped: ${countHuespeds}`, 318, 175);

  // HR
  doc.line(20, 185, 420, 185);

  // Header => Room number and contract number
  doc.addImage(roomIcon, 'JPG', 310, 25, 25, 25 );
  doc.text(`Habitación ${room}`, 335, 40);
  doc.setFontSize(13);
  doc.setFont("times", "italic");
  doc.addImage(contracIcon, 'PNG', 318, 45, 10, 10 );
  doc.text(`Contrato N° ${codeContract}`, 335, 53);
  doc.line(310, 60, 420, 60);

    // Current date
    doc.text(`${date}`, 130, 47);

  // Here the file save.
  doc.save(`contrato_${codeContract}.pdf`);
};