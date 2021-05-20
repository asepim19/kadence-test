import "./App.css";
import { useEffect, useState } from "react";
import { getData } from "./data/rawdata";

function App() {
	const data = getData();

	const [myData, setData] = useState([]);
	const [dataName, setName] = useState([]);

	let Education = [
		"Tidak ada pendidikan formal",
		"Sekolah Dasar",
		"Sekolah Menengah Pertama",
		"Sekolah Menengah Atas",
		"Akademi (D2/D3) / setingkatnya ",
		"Sarjana S-1 ",
		"Sarjana S-2 ",
		"Doktor (Sarjana S-3)",
		"Menolak ",
	];

	const countPekerjaan = () => {
		let kota = [
			{
				name: "Jakarta",
				result: [
					{ name: "laki-laki", 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, tjk: 0 },
					{ name: "perempuan", 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, tjk: 0 },
				],
				total: 0,
			},
			{
				name: "Bandung",
				result: [
					{ name: "laki-laki", 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, tjk: 0 },
					{ name: "perempuan", 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, tjk: 0 },
				],
				total: 0,
			},
			{
				name: "Surabaya",
				result: [
					{ name: "laki-laki", 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, tjk: 0 },
					{ name: "perempuan", 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, tjk: 0 },
				],
				total: 0,
			},
		];

		for (let i in data) {
			if (Number(data[i]["jenis_kelamin"]) === 1) {
				kota[Number(data[i]["Kota"]) - 1].result[0][data[i]["pekerjaan"]] =
					kota[Number(data[i]["Kota"]) - 1].result[0][data[i]["pekerjaan"]] + 1;
				kota[Number(data[i]["Kota"]) - 1].result[0]["tjk"] =
					kota[Number(data[i]["Kota"]) - 1].result[0]["tjk"] + 1;
			} else {
				kota[Number(data[i]["Kota"]) - 1].result[1][data[i]["pekerjaan"]] =
					kota[Number(data[i]["Kota"]) - 1].result[1][data[i]["pekerjaan"]] + 1;
				kota[Number(data[i]["Kota"]) - 1].result[1]["tjk"] =
					kota[Number(data[i]["Kota"]) - 1].result[1]["tjk"] + 1;
			}
			kota[Number(data[i]["Kota"]) - 1]["total"] =
				kota[Number(data[i]["Kota"]) - 1]["total"] + 1;
		}

		setData(kota.sort((a, b) => b.total - a.total));
	};

	const getName = () => {
		const Nama = data.filter((e) => e.pendidikan > 4);
		setName(Nama);
	};

	useEffect(() => {
		countPekerjaan();
		getName();
	}, []);

	let recent = null;
	return (
		<div className="container">
			<h1>KADENCE TEST</h1>
			<h3>
				Daftar Pekerja Berdasarkan Urutan Kota Terbanyak, Jenis Kelamin & Jumlah
				Dari Jenis Pekerjaan
			</h3>
			<hr />
			<table id="table_job">
				<thead>
					<tr>
						<th>Kota</th>
						<th>Jenis kelamin</th>
						<th>Ibu Rumah Tangga</th>
						<th>Pegawai Negeri Sipil</th>
						<th>Pegawai Negeri Swasta</th>
						<th>Wiraswasta</th>
						<th>Buruh Pabrik</th>
						<th>Lainnya</th>
						<th>Total Jenis Kelamin</th>
						<th>Total Kota</th>
					</tr>
				</thead>
				<tbody>
					{myData.map((e, i) => {
						return (
							<>
								{e.result.map((jk) => {
									if (recent !== e.name) {
										recent = e.name;
										return (
											<tr>
												<td rowSpan={2}>{e.name}</td>
												<td>{jk.name}</td>
												<td align="center">{jk[1]}</td>
												<td align="center">{jk[2]}</td>
												<td align="center">{jk[3]}</td>
												<td align="center">{jk[4]}</td>
												<td align="center">{jk[5]}</td>
												<td align="center">{jk[6]}</td>
												<td align="center">{jk["tjk"]}</td>
												<td align="center" rowSpan={2}>
													<b>{e["total"]}</b>
												</td>
											</tr>
										);
									} else {
										return (
											<tr>
												<td>{jk.name}</td>
												<td align="center">{jk[1]}</td>
												<td align="center">{jk[2]}</td>
												<td align="center">{jk[3]}</td>
												<td align="center">{jk[4]}</td>
												<td align="center">{jk[5]}</td>
												<td align="center">{jk[6]}</td>
												<td align="center">{jk["tjk"]}</td>
											</tr>
										);
									}
								})}
							</>
						);
					})}
				</tbody>
			</table>

			<h3>Daftar Pekerja Pendidikan Diatas SMA</h3>
			<hr />
			<table id="table_education">
				<thead>
					<tr>
						<th>Nama</th>
						<th>Pendidikan</th>
					</tr>
				</thead>
				<tbody>
					{dataName.map((e, i) => (
						<tr keys={i + "_education"}>
							<td>{e.Nama.toUpperCase()}</td>
							<td>{Education[e.pendidikan]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
