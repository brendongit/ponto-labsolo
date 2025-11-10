import { Svg, Path, Circle, Line, Rect } from '@react-pdf/renderer';

// Ícones baseados no Lucide, adaptados para @react-pdf/renderer

export const CalendarIcon = ({ size = 12, color = '#3B82F6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 4 }}>
    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={color} strokeWidth="2" fill="none" />
    <Line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="2" />
    <Line x1="8" y1="2" x2="8" y2="6" stroke={color} strokeWidth="2" />
    <Line x1="3" y1="10" x2="21" y2="10" stroke={color} strokeWidth="2" />
  </Svg>
);

export const ClockIcon = ({ size = 12, color = '#3B82F6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 4 }}>
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
    <Path d="M12 6v6l4 2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
  </Svg>
);

export const DollarSignIcon = ({ size = 12, color = '#3B82F6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 4 }}>
    <Line x1="12" y1="1" x2="12" y2="23" stroke={color} strokeWidth="2" />
    <Path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
  </Svg>
);

export const CheckIcon = ({ size = 12, color = '#10B981' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 4 }}>
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const XIcon = ({ size = 12, color = '#EF4444' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 4 }}>
    <Line x1="18" y1="6" x2="6" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="6" y1="6" x2="18" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const ListIcon = ({ size = 14, color = '#3B82F6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <Line x1="8" y1="6" x2="21" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="8" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="8" y1="18" x2="21" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="3" y1="6" x2="3.01" y2="6" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="3" y1="12" x2="3.01" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="3" y1="18" x2="3.01" y2="18" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const BarChart3Icon = ({ size = 14, color = '#3B82F6' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 6 }}>
    <Line x1="12" y1="20" x2="12" y2="10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="18" y1="20" x2="18" y2="4" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <Line x1="6" y1="20" x2="6" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

export const MapPinIcon = ({ size = 10, color = '#6B7280' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 3 }}>
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={color} strokeWidth="2" fill="none" />
    <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" fill="none" />
  </Svg>
);

export const UserIcon = ({ size = 12, color = '#ffffff' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" style={{ marginRight: 4 }}>
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
    <Circle cx="12" cy="7" r="4" stroke={color} strokeWidth="2" fill="none" />
  </Svg>
);
