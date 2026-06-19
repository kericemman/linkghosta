import { Linkedin, UsersRound } from "lucide-react";
import { useEffect, useState } from "react";
import Container from "../../../shared/Container.jsx";
import { teamService } from "../../../../services/teamService.js";

export default function AboutTeamSection() {
  const [team, setTeam] = useState([]);
  useEffect(() => { teamService.listPublic().then(({ data }) => setTeam(data.data || [])).catch(() => setTeam([])); }, []);
  return (
    <section className="-mx-4 bg-white px-4 py-10 text-ink sm:py-20 lg:py-24"><Container>
      <div className="max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand-700">The team</p><h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">The people behind the voice.</h2></div>
      {team.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{team.map((member) => <article key={member._id} className="overflow-hidden rounded-lg border border-brand-500/15 bg-surface-warm"><div className="aspect-[4/3] bg-neutral-100">{member.profileImage ? <img src={member.profileImage} alt={member.name} className="h-full w-full object-cover"/> : <div className="flex h-full items-center justify-center text-brand-700"><UsersRound size={42}/></div>}</div><div className="p-5"><div className="flex items-start justify-between gap-3"><div><h3 className="text-xl font-extrabold">{member.name}</h3><p className="mt-1 text-sm font-bold text-brand-700">{member.title}</p></div>{member.linkedinUrl && <a href={member.linkedinUrl} target="_blank" rel="noreferrer" aria-label={`${member.name} on LinkedIn`} className="text-[#0a66c2]"><Linkedin size={20}/></a>}</div><p className="mt-4 text-sm leading-7 text-neutral-700">{member.bio}</p></div></article>)}</div> : <div className="mt-10 rounded-lg border border-brand-500/15 bg-surface-warm p-8"><p className="text-base font-bold">Team profiles are being prepared.</p></div>}
    </Container></section>
  );
}
