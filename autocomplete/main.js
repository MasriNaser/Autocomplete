const search = document.getElementById('search');
const match = document.getElementById('match');

const test = async searchText => {
  const res = await fetch('./data.json');
  const stadden = await res.json();

  let matches = stadden.filter(stad => {
    const regex = new RegExp(`^${search.value}`, 'gi');
    return stad.city.match(regex) || stad.admin.match(regex);
  });
  console.log(matches);
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = '';
  }
  outputHtml(matches);
};
//show result

const outputHtml = matches => {
  if (matches.length > 0) {
    const html = matches
      .map(
        match => `
        <div class="content">
  <ol type="1">
    <li>${match.country}</li>
    <li>city: ${match.city}</li>
    <li>Region: ${match.admin}</li>
  </ol>
  </div>
    `
      )
      .join('');
    matchList.innerHTML = html;
  }
};

search.addEventListener('input', () => test(search.value));
