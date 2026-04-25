import { useState, useEffect } from 'react';
import api from '@/lib/api';

interface Settings {
  logo: string | null;
  favicon: string | null;
  phone: string;
  whatsapp: string;
  address: string;
  client_area_url: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    logo: null,
    favicon: null,
    phone: '(46) 3025-3800',
    whatsapp: '554630253800',
    address: 'Rua Guarani, nº 1315 - Centro - Pato Branco-Pr',
    client_area_url: 'https://ispfy.aknet.net.br'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get('/settings');
        setSettings(res.data.data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  return { settings, loading };
};
