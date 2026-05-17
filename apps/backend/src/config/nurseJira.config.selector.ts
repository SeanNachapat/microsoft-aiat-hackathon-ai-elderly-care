import { nurseJiraConfigEN } from './nurseJira.config.en';
import { nurseJiraConfigTH } from './nurseJira.config.th';
import { NurseJiraConfig } from '../types/nurseJira.types';

type SupportedLanguage = 'en' | 'th';

export function getNurseJiraConfig(lang: SupportedLanguage): NurseJiraConfig {
  switch (lang) {
    case 'th': return nurseJiraConfigTH;
    case 'en':
    default:   return nurseJiraConfigEN;
  }
}
