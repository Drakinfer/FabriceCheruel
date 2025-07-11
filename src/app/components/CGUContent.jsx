import Link from "next/link"

export default function CGUContent({ withPadding = true }) {

  return (
    <div className={`space-y-4 text-sm text-justify ${withPadding ? 'pb-[180px]' : ''}`}>
      <h1 className="text-2xl font-bold text-center mb-6">Conditions Générales d&apos;Utilisation</h1>
      <p className="italic text-center">Dernière mise à jour : 10/07/2025</p>

      <p>
        Bienvenue sur le site de Fabrice Cheruel. En accédant et en naviguant sur ce site, vous acceptez pleinement et sans réserve les présentes Conditions Générales d&apos;Utilisation (CGU). Si vous n&apos;acceptez pas ces conditions, veuillez ne pas utiliser ce site.
      </p>

      <h2 className="font-semibold">1. Propriété intellectuelle</h2>
      <p>
        Toutes les œuvres présentées sur ce site, y compris les photographies, illustrations, textes et tout autre contenu, sont la propriété exclusive de l&apos;artiste Fabrice Cheruel, sauf mention contraire.
      </p>
      <p>
        Toute reproduction, représentation, utilisation, adaptation, modification, diffusion, partielle ou totale, du contenu du site, par quelque moyen que ce soit, sans l&apos;autorisation écrite préalable de l&apos;artiste, est strictement interdite. Toute infraction pourra donner lieu à des poursuites conformément aux dispositions du Code de la propriété intellectuelle.
      </p>

      <h2 className="font-semibold">2. Utilisation du forum</h2>
      <p>
        Un espace de discussion est mis à disposition des utilisateurs via un forum ou une section commentaires. L&apos;utilisation de cet espace implique le respect des règles de bienséance et de courtoisie :
      </p>
      <ul className="list-disc list-inside">
        <li>Pas d&apos;insultes, propos haineux, diffamatoires, discriminatoires ou contraires à la loi ;</li>
        <li>Pas de harcèlement, spam ou contenu à caractère publicitaire non sollicité ;</li>
        <li>Pas de diffusion de contenus illicites ou inappropriés.</li>
      </ul>
      <p>
        L&apos;artiste se réserve le droit de modérer, modifier ou supprimer, sans préavis, tout message ou contenu qu&apos;il jugera inapproprié ou non conforme à ces règles.
      </p>

      <h2 className="font-semibold">3. Responsabilité</h2>
      <p>
        L&apos;artiste s&apos;efforce de maintenir le site à jour et accessible, mais ne peut garantir l&apos;exactitude des informations ni la disponibilité permanente du site. Il ne pourra être tenu responsable en cas de dysfonctionnement, interruption ou perte de données liée à l'utilisation du site.
      </p>

      <h2 className="font-semibold">4. Données personnelles</h2>
      <p>
        Aucune donnée personnelle n&apos;est collectée sans votre consentement. Les données éventuellement collectées (via formulaire ou inscription au forum) sont exclusivement destinées à la gestion du site et ne sont jamais transmises à des tiers sans autorisation.
      </p>

      <h2 className="font-semibold">5. Modifications des CGU</h2>
      <p>
        Ces CGU peuvent être modifiées à tout moment, sans préavis. Il est recommandé de les consulter régulièrement.
      </p>

      <h2 className="font-semibold">6. Contact</h2>
      <p>
        Pour toute question relative à ces CGU ou pour demander une autorisation d&apos;utilisation d&apos;une œuvre, vous pouvez contacter l&apos;artiste à l&apos;adresse suivante : fabrice.cheruel@gmail.com ou par le formulaire de contact <Link href="/contact">ici</Link>.
      </p>
    </div>
  );
}
