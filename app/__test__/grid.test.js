import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Grid from '../components/grid';



describe('Grid Component', () => {
beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(<Grid/>);
  
})
    it('Should render the grid with the correct data', () => {
        expect(screen.getByText('smss.exe')).toBeInTheDocument();
        expect(screen.getByText('netsh.exe')).toBeInTheDocument();
        expect(screen.getByText('7za.exe')).toBeInTheDocument();
    });

    it('Should select all checkboxes when the select all checkbox is checked', () => {
        const selectAllCheckbox = screen.getByRole('checkbox', { name: 'Select All' });
        expect(selectAllCheckbox).not.toBeChecked();
        fireEvent.click(selectAllCheckbox);
        expect(selectAllCheckbox).toBeChecked();
        expect(screen.getAllByRole('checkbox').every((checkbox) => checkbox.checked)).toBe(true);
    });

    it('Should select individual checkboxes when the select all checkbox is checked',  () => {
        const smssCheckbox =  screen.getByRole('checkbox', {name: "7za.exe" });
        const cryptbaseCheckbox = screen.getByRole('checkbox', {name: "cryptbase.dll" });
        expect(smssCheckbox).not.toBeChecked();
        fireEvent.click(smssCheckbox);
        expect(smssCheckbox).toBeChecked();
        expect(cryptbaseCheckbox).not.toBeChecked();
        fireEvent.click(cryptbaseCheckbox);
        expect(cryptbaseCheckbox).toBeChecked();
    })

    it('Should download selected button clickable when at least one checkbox is checked',  () => {
        
        jest.spyOn(window, 'alert').mockImplementation(() => {});

        const downloadText = screen.getByText('Download Selected');
        const netshCheckbox =  screen.getByRole('checkbox', {name: "netsh.exe" });
     
     
        expect(netshCheckbox).not.toBeChecked();
        fireEvent.click(netshCheckbox);
        expect(netshCheckbox).toBeChecked();
        fireEvent.click(downloadText);
       expect(window.alert).toHaveBeenCalledWith('Downloading the following files : \n' +
          'Name :netsh.exe Device :Targaryen Path :\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe \n');
       
    })

    it('Should download selected button clickable when at two  checkbox is checked',  () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        const downloadText = screen.getByText('Download Selected');
        const netshCheckbox =  screen.getByRole('checkbox', {name: "netsh.exe" });
        const uxthemeCheckbox = screen.getByRole('checkbox', {name: "uxtheme.dll" });
        fireEvent.click(netshCheckbox);
        expect(netshCheckbox).toBeChecked(); 
        fireEvent.click(uxthemeCheckbox);
        fireEvent.click(downloadText);
       expect(window.alert).toHaveBeenCalledWith('Downloading the following files : \n' +
          'Name :netsh.exe Device :Targaryen Path :\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe \n' +
          'Name :uxtheme.dll Device :Lanniester Path :\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll \n');
       
    })

    it('Should show correct count of selected checkboxes', () => {
        const selectAllCheckbox = screen.getByRole('checkbox', { name: 'Select All' });
        fireEvent.click(selectAllCheckbox);
        expect(selectAllCheckbox).toBeChecked();
        expect(screen.getByText('5 Selected')).toBeInTheDocument();
    })

    it('Should show correct count when no checkbox is checked', () => {
        expect(screen.getByText('Non Selected')).toBeInTheDocument();
    })

    it('Should show correct count when two checkboxes are checked', () => {
        const smssCheckbox =  screen.getByRole('checkbox', {name: "7za.exe" });
        const cryptbaseCheckbox = screen.getByRole('checkbox', {name: "cryptbase.dll" });
        fireEvent.click(smssCheckbox);
        fireEvent.click(cryptbaseCheckbox);
        expect(screen.getByText('2 Selected')).toBeInTheDocument();
    })


    it('Should not able to click on download button when no checkbox is checked', () => {
        const downloadText = screen.getByText('Download Selected');
        expect(downloadText).toHaveClass('normalText');
    })


    it('Should not able to click on download button when status code is not available', () => {
        const downloadText = screen.getByText('Download Selected');
        const smssCheckbox =  screen.getByRole('checkbox', {name: "7za.exe" });
        fireEvent.click(smssCheckbox);
        expect(downloadText).toHaveClass('normalText');
    })

})
