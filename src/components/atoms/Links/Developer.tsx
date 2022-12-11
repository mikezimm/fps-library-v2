import * as devLinks from './LinksDevDocs';
import * as chartJSLinks from './LinksChartJS';
// import * as repoLinks from './LinksRepos';

//import { IHelpTableRow, IHelpTable, IPageContent, ISinglePageProps } from '../Component/ISinglePageProps';
import { IHelpTable,  } from '../../../banner/components/SingleHelpPage/ISinglePageProps';

export function devTable() {

    let table : IHelpTable  = {
        heading: 'Open source components and docs used in webparts',
        headers: ['MS Dev Docs','Github','Description'],
        rows: [],
    };


    table.rows.push( [ devLinks.devDocsWeb, devLinks.gitRepoSPFxContReact , 'MSFT Dev Docs for Fabric React UI Components' ] );
    table.rows.push( [ devLinks.devDocsPnpJSsp, devLinks.gitRepoPnpJSsp, 'PNP JS sp:  Library for interacting with SPO' ] );
    table.rows.push( [ '', devLinks.FLICONio, 'Search available icons' ] );
    table.rows.push( [ devLinks.devDocsIcon, '', '' ] );
    table.rows.push( [ devLinks.devDocsText, '', '' ] );
    table.rows.push( [ devLinks.devDocsDate, devLinks.gitSampleReactDate, '' ] );
    table.rows.push( [ devLinks.devDocsSlider, '', '' ] );
    table.rows.push( [ devLinks.devDocsToggle, '', '' ] );

    table.rows.push( [ devLinks.devDocsDropdown, '', '' ] );
    table.rows.push( [ devLinks.devDocsCheckbox, '', '' ] );
    table.rows.push( [ devLinks.devDocsSearchbox, '', '' ] );
    table.rows.push( [ devLinks.devDocsProgress, '', '' ] );
    table.rows.push( [ devLinks.devDocsMessageBar, '', '' ] );
    table.rows.push( [ devLinks.devDocsPanel, '', '' ] );
    table.rows.push( [ devLinks.devDocsPeoplePicker, '', '' ] );

    table.rows.push( [ devLinks.devDocsChoice, '', '' ] );
    
    table.rows.push( [ devLinks.devDocsButton, '', '' ] );
    table.rows.push( [ devLinks.devDocsStack, '', '' ] );
    table.rows.push( [ devLinks.devDocsList, devLinks.gitSampleReactList, '' ] );

    table.rows.push( [ devLinks.devDocsPivo, '', '' ] );
    table.rows.push( [ devLinks.devDocsReGr, '', '' ] );
    table.rows.push( [ devLinks.devDocsLink, '', '' ] );

    table.rows.push( [ chartJSLinks.chartJSSamples, '', '' ] );
    table.rows.push( [ '', devLinks.gitSampleWebPartTitle , 'React Webpart Title' ] );


    return { table: table };
}