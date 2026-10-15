import analogDigital from '../assets/images/analog-digital.svg';
import analogDigitalPng from '../assets/images/analog-digital.png';
import bigOChart from '../assets/images/big-o-chart.jpeg';
import asymptoticAnalysis from '../assets/images/data-structure-asymptotic-analysis.png';
import sourceCodeFlow from '../assets/diagrams/source-code-flow.mmd?raw';
import logo from '../assets/images/carbon-cube.svg';

export const logoAsset = logo;

export const imageAssets: Record<string, string> = {
  'analog-digital.png': analogDigitalPng,
  'analog-digital.svg': analogDigital,
  'big-o-chart.jpeg': bigOChart,
  'data-structure-asymptotic-analysis.png': asymptoticAnalysis,
};

export const diagramSources: Record<string, string> = {
  'source-code-flow': sourceCodeFlow,
};
