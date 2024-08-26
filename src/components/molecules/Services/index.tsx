import styles from './ServiceCard.module.scss';
import { Heading } from '@/components/atoms/Heading';

const servicesList = [{
    icon: '',
    title: 'Marketing',
    description: 'SEO, Running ads on social media, you name it I can make it done'
}, {
    icon: '',
    title: 'Marketing',
    description: 'SEO, Running ads on social media, you name it I can make it done'
}, {
    icon: '',
    title: 'Marketing',
    description: 'SEO, Running ads on social media, you name it I can make it done'
}, {
    icon: '',
    title: 'Marketing',
    description: 'SEO, Running ads on social media, you name it I can make it done'
}
]

const ServiceCard = (props) => {
    return (
        <div className={`${styles.serviceCardWrapper}`}>
            <div className={styles.iconWrapper}>

            </div>
            <Heading tagName={'h5'} className={styles.heading} content={props?.title}></Heading>
            <div className={styles.separator}>
                <div className={styles.separator1}></div>
                <div className={styles.separator2}></div>
            </div>
            <p className={styles.description}>{props?.description}</p>
        </div>
    )
}


export const Services = () => {
    return (
        <div className={styles.servicesList}>
            {servicesList.map((item, index) => {
                return (
                    <ServiceCard {...item} />
                )
            })}
        </div>
    )
}