import classNames from 'classnames';
import styles from './styles.module.css';

export const Objects = () => {
    return (
        <div className={styles.objects}>
            <div className={styles.header}>
                <div className={classNames(styles.header_element, styles.place)}>
                    <h3 className={styles.title}>Название</h3>
                    <p className={styles.content}>Ресторан “Chica”</p>
                </div>
                <div className={classNames(styles.header_element, styles.partner)}>
                    <h3 className={styles.title}>Название</h3>
                    <p className={styles.content}>Ресторан “Chica”</p>
                </div>
                <div className={classNames(styles.header_element, styles.city)}>
                    <h3 className={styles.title}>Название</h3>
                    <p className={styles.content}>Бишкек, Кыргызстан</p>
                </div>
                <div className={classNames(styles.header_element, styles.name)}>
                    <h3 className={styles.title}>Название</h3>
                    <p className={styles.content}>Ресторан “Chica”</p>
                </div>
                <div className={classNames(styles.header_element, styles.num)}>
                    <h3 className={styles.title}>Название</h3>
                    <p className={styles.content}>Ресторан “Chica”</p>
                </div>
            </div>
            <div className={styles.info}>
                <div className={classNames(styles.info_element, styles.info_element__front)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__package)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__cook)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__rate)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__qr)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__startdate)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__enddate)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__left)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__sum)}>
                    <div className={styles.title}>title</div>
                    <div className={styles.content}>content</div>
                </div>
                <div className={classNames(styles.info_element, styles.info_element__date)}>
                    <div className={styles.title}>date</div>
                    <div className={styles.content}>content</div>
                </div>
            </div>
        </div>
    )
}