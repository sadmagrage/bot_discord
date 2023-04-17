function getDayOfYear(date = new Date()) {
  const timestamp1 = Date.UTC(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);

  const differenceInMilliseconds = timestamp1 - timestamp2;

  const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;

  return differenceInDays;
}

function Timer() {
	//progress already set
	// {
	// 	year: 2023,
	// 	month: 2,
	// 	day: 12,
	// 	hour: 20,
	// 	minute: 20,
	// 	second: 30
	// }
	const formatDate = {
		year: 2023,
		month: 2,
		day: 7,
		hour: 16,
		minute: 50,
		second: 0
	}
	const date = {
	  year: formatDate.year,
	  day: getDayOfYear(new Date(formatDate.year, formatDate.month - 1, formatDate.day)),
	  hour: formatDate.hour,
	  minute: formatDate.minute,
	  second: formatDate.second
	}

	let anoDiferenca, diaDiferenca, horaDiferenca, minutoDiferenca, segundoDiferenca, adicionarDias, contadorMensagem;
	
	const D = new Date();

	adicionarDias = 0;
	anoDiferenca = D.getFullYear() - date.year;
	diaDiferenca = getDayOfYear(D) - date.day;
	horaDiferenca = D.getHours() - date.hour;
	minutoDiferenca = D.getMinutes() - date.minute;
	segundoDiferenca = D.getSeconds() - date.second;

	
	  if (anoDiferenca != 0)
	  {
		  for(let i = 1; i <= anoDiferenca; i++)
		  {
			  if ((date.year + i) % 4 == 0)
			  {
				  adicionarDias += 366;
			  }
			  else
			  {
				  adicionarDias += 365;
			  }
		  }
		  diaDiferenca += adicionarDias;
	  }
	  
	  if (segundoDiferenca < 0)
	  {
		  segundoDiferenca += 60;
		  minutoDiferenca--;
	  }
	  if (minutoDiferenca < 0)
	  {
		  minutoDiferenca += 60;
		  horaDiferenca--;
	  }
	  if (horaDiferenca < 0 || minutoDiferenca == 59)
	  {
		  horaDiferenca += 24;
		  diaDiferenca--;
	  }
	  if (horaDiferenca == 24)
	  {
		  horaDiferenca = 0;
	  }
	  if (minutoDiferenca == 60)
	  {
		  minutoDiferenca = 0;
	  }
	  if (segundoDiferenca == 60)
	  {
		  segundoDiferenca = 0;
	  }
	  
	  if (diaDiferenca == 0 && horaDiferenca == 0 && minutoDiferenca == 0)
	  {
		  contadorMensagem = segundoDiferenca+"s";
	  }
	  else if (diaDiferenca == 0 && horaDiferenca == 0)
	  {
		  contadorMensagem = minutoDiferenca+":"+segundoDiferenca;
	  }
	  else if (diaDiferenca == 0)
	  {
		  contadorMensagem = horaDiferenca+":"+minutoDiferenca+":"+segundoDiferenca;
	  }
	  else
	  {
		  contadorMensagem = diaDiferenca+":"+horaDiferenca+":"+minutoDiferenca+":"+segundoDiferenca;
	  }
	  
	  return contadorMensagem;
}

module.exports = Timer;