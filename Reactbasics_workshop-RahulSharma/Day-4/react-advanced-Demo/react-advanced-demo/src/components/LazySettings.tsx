import React, { useState } from 'react';
import { Button } from '@/components/ui/button.jsx';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.jsx';

interface SettingsProps {
  // Optional props for future extensibility
  theme?: 'light' | 'dark';
}

const LazySettings: React.FC<SettingsProps> = ({ theme = 'light' }) => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [autoSave, setAutoSave] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>('en');

  console.log('LazySettings component loaded and rendered');

  const toggleNotifications = () => {
    setNotifications(prev => !prev);
  };

  const toggleAutoSave = () => {
    setAutoSave(prev => !prev);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <Card className="max-w-md mx-auto mt-4" data-testid="lazy-settings">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Settings Panel</CardTitle>
        <CardDescription>
          This component was lazy loaded using React.lazy() and Suspense
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Notifications Setting */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h3 className="font-medium">Notifications</h3>
            <p className="text-sm text-gray-600">Receive push notifications</p>
          </div>
          <Button
            onClick={toggleNotifications}
            variant={notifications ? 'default' : 'outline'}
            size="sm"
          >
            {notifications ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Auto Save Setting */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <h3 className="font-medium">Auto Save</h3>
            <p className="text-sm text-gray-600">Automatically save changes</p>
          </div>
          <Button
            onClick={toggleAutoSave}
            variant={autoSave ? 'default' : 'outline'}
            size="sm"
          >
            {autoSave ? 'On' : 'Off'}
          </Button>
        </div>

        {/* Language Setting */}
        <div className="p-3 border rounded-lg">
          <h3 className="font-medium mb-2">Language</h3>
          <div className="flex gap-2">
            {['en', 'es', 'fr', 'de'].map(lang => (
              <Button
                key={lang}
                onClick={() => handleLanguageChange(lang)}
                variant={language === lang ? 'default' : 'outline'}
                size="sm"
                className="text-xs"
              >
                {lang.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Settings Display */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Current Settings:</h4>
          <ul className="text-xs space-y-1 text-gray-600">
            <li>Notifications: {notifications ? 'Enabled' : 'Disabled'}</li>
            <li>Auto Save: {autoSave ? 'Enabled' : 'Disabled'}</li>
            <li>Language: {language.toUpperCase()}</li>
            <li>Theme: {theme}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default LazySettings;
