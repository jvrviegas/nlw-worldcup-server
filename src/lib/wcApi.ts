import axios from 'axios';

export const wcApi = axios.create({
  baseURL: 'http://api.cup2022.ir/api/v1',
});

type WCApiBoolean = 'FALSE' | 'TRUE';

export interface IWCApiMatch {
  _id: string;
  away_score: number;
  away_scorers: string[];
  away_team_id: string;
  finished: WCApiBoolean;
  group: string;
  home_score: number;
  home_scorers: string[];
  home_team_id: string;
  id: string;
  local_date: string;
  matchday: string;
  persian_date: string;
  stadium_id: string;
  time_elapsed: string;
  type: string;
  home_team_en: string;
  away_team_en: string;
  home_flag: string;
  away_flag: string;
}
