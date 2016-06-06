Write-Host  
Write-Host "" -ForegroundColor Yellow  
$wspPack = Read-Host "write your wsp solution. example:weather.wsp" 

if($wspPack.Deployed -eq $true){
  Uninstall-SPSolution –Identity $wspPack  
  Remove-SPSolution –Identity $wspPack 
}

Add-SPSolution -LiteralPath \\server-sc\Install\Images\devsp\$wspPack

Install-SPSolution –Identity $wspPack -GACDeployment